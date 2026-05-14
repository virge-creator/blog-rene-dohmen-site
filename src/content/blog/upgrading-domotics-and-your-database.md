---
title: 'Upgrading Domotics and your database'
date: '2020-08-22 16:26'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux","git","database"]
thumbnail: '/images/thumbnails/domoticz.jpg'
status: 'published'
---

My domoticz system did run quite a while with updates straight from the Domoticz github repo. But after a while the
update failed on new library requirements. So I cloned a new Domoticz and started compiling from scratch.

## Upgrading libs

The first thing to upgrade was cmake, as you have to compile newer versions of Domoticz with a newer cmake. This proofed
to be a bit problematic on an older ubuntu system. After that you will also need Boost and if you used zwave this is
a good moment to update the libraries for it. Domoticz, at this moment, needs at least CMake 3.16, Boost 1.72 and
optionally OpenZWave 1.6+

Note: all command block below assume that you start from your home directory or a directory of your choice.

### Remove any previous CMake installation
You have to remove it first:
```
sudo apt remove --purge --auto-remove cmake
```

### Compile CMake
To compile/install CMake issue the following commands:
```
wget https://github.com/Kitware/CMake/releases/download/v3.18.0/cmake-3.18.0.tar.gz
tar -xzvf cmake-3.18.0.tar.gz
rm cmake-3.18.0.tar.gz
cd cmake-3.18.0
./bootstrap
make
sudo make install
cd ..
rm -Rf cmake-3.18.0
```

Verify you are on the correct version with:
```
cmake --version
```
Image: cmake-version.png

### Remove previous Boost libraries
Remove previous version with:
```
sudo apt remove --purge --auto-remove libboost-dev libboost-thread-dev libboost-system-dev libboost-atomic-dev libboost-regex-dev libboost-chrono-dev
```

### Compile Boost libraries
To compile/install Boost issue the following commands:
```
mkdir boost
cd boost
wget https://dl.bintray.com/boostorg/release/1.72.0/source/boost_1_73_0.tar.gz
tar xfz boost_1_73_0.tar.gz
cd boost_1_73_0/
./bootstrap.sh
./b2 stage threading=multi link=static --with-thread --with-system
sudo ./b2 install threading=multi link=static --with-thread --with-system
cd ../../
sudo rm -Rf boost/
```

### Build Support for OpenZWave 1.6+
If you need support for ZWave, you need to compile open-zwave before compiling domoticz
Make sure to follow the below steps, you will end up with a folder layout like:
```
git clone https://github.com/OpenZWave/open-zwave
cd open-zwave
git pull
make
sudo make install
```

### Compile a new domoticz
```
git clone https://github.com/domoticz/domoticz.git new-domoticz
cd new-domoticz/
cmake -DCMAKE_BUILD_TYPE=Release CMakeLists.txt
make -j 3
```

I also did some changes in the startup scripts, aka converted stuff from rc.d tot system V services.

```
sudo vim /etc/systemd/system/domoticz.service
```

Contents:
```
[Unit]
       Description=domoticz_service
[Service]
       User=acidjunk
       Group=acidjunk
       ExecStart=/home/acidjunk/new-domoticz/domoticz -www 8080 -sslwww 443
       WorkingDirectory=/home/acidjunk
       # Give the right to open priviliged ports. This allows you to run on a port <1024 without root permissions (user/group setting above)
       #
       # The next line was previously working, so try this on older systems.
       #ExecStartPre=/sbin/setcap 'cap_net_bind_service=+ep' /home/acidjunk/domoticz/domoticz
       #
       # The below works on ubuntu 16 LTS.
       CapabilityBoundingSet=CAP_NET_BIND_SERVICE
       Restart=on-failure
       RestartSec=1m
       #StandardOutput=null
[Install]
       WantedBy=multi-user.target
```

Enable new domoticz service at Boot and disable the previous loaders:
```
sudo systemctl enable domoticz.service
sudo systemctl start domoticz.service
sudo update-rc.d
sudo update-rc.d domoticz.sh disable
```

More info can be found on the excellent [Domoticz wiki](https://www.domoticz.com/wiki/Build_Domoticz_from_source).
