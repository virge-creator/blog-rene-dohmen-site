---
title: 'Fixed: X won\''''t start after update to Ubuntu 12.04.3'
date: '2013-08-24 19:07'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","tutorial"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

I'm running a dual-screen set-up and need the proprietary drivers
because the standard ones won't drive the second screen at full
resolution.

After updating to 12.0.4.3, xserver/gdm/lightdm won't load at all. So
only console login is left.

It appears they've messed up your kernel module configuration by
installing both an upstream Nvidia driver as well as one from the Ubuntu
repositories.

Now the "userland" Xorg libraries don't match the version of the
kernel module and that's what you're seeing here in the Xorg error
logs. I'll describe the steps to take in order to get a graphical login
again.

1.  Uninstall the manually installed Nvidia driver. Refer to one of the
    many questions on this, e.g.

    [How to uninstall manually installed Nvidia
    drivers?](http://askubuntu.com/q/219942/88802)

2.  Uninstall all possible Ubuntu's Nvidia packages:

``` {.bash}
sudo apt-get purge 'nvidia-*'
```

1.  List and remove the Nvidia kernel modules still installed (if any)
    at this point:

``` {.bash}
dkms status
dkms remove nvidia -k your-kernel-version-here
```

*Repeat this until you see no Nvidia modules anymore using ``dkms
status``.*

1.  Install from the repositories:

``` {.bash}
sudo apt-get install nvidia-current nvidia-settings
```

or if you need newer/recent versions:

``` {.bash}
sudo apt-get install nvidia-current-updates nvidia-settings-updates
```

1.  Verify that the Nvidia kernel driver is build for your running
    kernel:

``` {.bash}
dkms status | grep `uname -r`
```

should produce e.g.
`nvidia-304-updates, 304.88, 3.2.0-52-generic-pae, i686: installed`.

Reboot.
