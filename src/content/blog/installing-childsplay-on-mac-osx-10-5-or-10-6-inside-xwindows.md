---
title: 'Installing childsplay on MAC OSX 10.5 or 10.6 inside Xwindows'
date: '2010-09-22 21:28'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

This is what I did to get a recent childsplay from SVN running on the
mac.

1)  Install xCode
2)  Installed Mac Ports: <http://www.macports.org/>
3)  Install the dependencies with the follwing console commands; be
    warned it takes a very long time\...

``` {.bash}
sudo port  selfupdate
sudo port install py26-game
sudo port install py26-sqlalchemy
sudo port install py26-gtk
```

Optionally install python_select and activate python2.6 as default with

``` {.bash}
sudo python_select python26
```
