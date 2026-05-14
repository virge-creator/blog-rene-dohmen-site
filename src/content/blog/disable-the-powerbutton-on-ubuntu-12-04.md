---
title: 'Disable the powerbutton on Ubuntu 12.04'
date: '2013-08-16 21:23'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

In Debian or Ubuntu minimal disabling the power button is quite easy.
Just remove the contents of /etc/acpi/powerbtn.sh. That doesn't work in
Ubuntu with Gnome/Unity. The shutdown procedure is quite complex; acpid,
gnome-power-manager, polkit all play some kind of role in it. After a
lot of reading I stumbled upon a post in the ubuntu forums where someone
kindly analysed the Ubuntu shutdown button proces:
<http://ubuntuforums.org/showthread.php?t=2020630>

What I did to disable the power button completely, was eventually very
easy:

``` {.bash}
gsettings set org.gnome.settings-daemon.plugins.power button-power nothing
```
