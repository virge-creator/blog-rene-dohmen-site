---
title: 'Downloading OpenStack images with Glance'
date: '2014-01-10 23:58'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","docker"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

When you create OpenStack snapshots you'll also need to download the
snapshot to a safe location. There are a couple of ways to do this;
I'll describe an easy way by using the command line tools.

First install it:

``` {.bash}
sudo add-apt-repository ppa:glance-core/trunk
sudo apt-get update
sudo apt-get install glance
```

You'll need a keystonerc file to authenticate yourself. Import the
settings from the keystone file with:

``` {.bash}
source keystonefile
```

a keystone file will look like this:

``` {.bash}
export OS_USERNAME=username
export OS_TENANT_NAME=projectname
export OS_PASSWORD=xxxxxxxxx
export OS_AUTH_URL=http://xxxxx:xx/v2.0/
```

Then you should be able to run:

``` {.bash}
glance index
```

You will see a list of all the snapshots on the OpenStack cloud.

``` {.bash}
ID                                   Name                           Disk Format          Container Format     Size
------------------------------------ ------------------------------ -------------------- -------------------- --------------
g21f774c-a639-45d9-b9f4-bc076a431cea rsync-btp4home-week52          qcow2                bare                     5259657216
95728d6a-0afb-4e23-8231-8332ee1a526c formatics-php-week52           qcow2                bare                     3636461568
```

Now you have 2 options; use the ID of the snaphot or use the name; I'll
do the latter as it is easier to automate.

``` {.bash}
glance image-download formatics-php-week52 --file /mnt/data/formatics-php-week52.img
```

Voila; have fun with your downloaded openstack snapshot.
