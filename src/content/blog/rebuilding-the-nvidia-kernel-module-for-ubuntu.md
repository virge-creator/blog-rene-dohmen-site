---
title: 'Rebuilding the nvidia kernel module for Ubuntu'
date: '2014-09-29 12:02'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

I recently bought a GTX 750Ti which isn't supported by Ubuntu's
drivers yet. So I installed the drivers from Nvidia itself. They work
great, the card is very quiet and operates without getting hot at all.
One problem: after running an Ubuntu update that updates your kernel it
won't work anymore.

``` {.bash}
sudo su
cd /usr/src
ls
```

Examine the output: My nvidia driver src location:
/usr/src/nvidia-334.21

``` {.bash}
dkms build -m nvidia -v 334.21
dkms install -m nvidia -v 334.21
```

If the commands fail on missing linux headers, install them:

``` {.bash}
sudo apt-get install linux-headers-$(uname -r)
```

Now you have 2 options: Reboot or do a modprobe nvidia and restart X

Enjoy fancy Nvidia graphics again
