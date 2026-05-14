---
title: 'Install python PIL or Pillow on Ubuntu 14.04 64 bit'
date: '2015-05-19 09:37'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

Every now and then I have to install Python PIL or Pillow on an Ubuntu
server. I mostly end up with problems like no jpeg support or no
compressed png support. After some googling you will find all kinds of
info consisting of creating symlinks on some locations so it will work
on 64 bit Ubuntu etc.

As it turns out the install is quite easy, without the need to manually
symlink stuff. First install deps:

``` {.bash}
sudo apt-get install libtiff5-dev libjpeg8-dev zlib1g-dev libfreetype6-dev liblcms2-dev
libwebp-dev tcl8.6-dev tk8.6-dev python-tk
```

Then you should be able to installing python imaging stuff with:

``` {.bash}
sudo pip install pillow
```

If you already installed pillow before you installed all the needed
deps; changes are that you don't have jpeg support; you can then force
a reinstall with:

``` {.bash}
sudo pip install -I Pillow
```
