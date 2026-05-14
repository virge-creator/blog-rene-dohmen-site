---
title: 'Installing pygame 1.9 / seniorplay on snow leopard, without X'
date: '2010-06-23 21:59'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

Getting pygame going on MAC OSX is not for the fainthearted; so be
warned\....

It will also take a lot of time One my first attempt I tried to use the
OSX tools as much as possible. This didn't work after trying all
possible combi's of SDL as OSX framework and SDL as unix lib I tried
the mac ports approach.

This is what I did to get it running without having to use an Xserver
window

1)  Installed Mac Ports: <http://www.macports.org/>

2\) In terminal: sudo port selfupdate sudo port install py26-game sudo
port install py26-sqlalchemy

Now wait a very long time: almost 2 hours to compile all dependencies
(if you didn't use mac port before)

3\) get seniorplay: svn co
[https://schoolsplay.svn.sourceforge.net/svnroot/schoolsplay/branches/sen\...](https://schoolsplay.svn.sourceforge.net/svnroot/schoolsplay/branches/seniorplay)

4)  in SPConstants.py I changed: noGTK to true; I don't need GTK now
    :-)
5)  started seniorplay with the mac ports python in
    /opt/local/bin/python2.6

/opt/local/bin/python2.6 seniorplay_sp_local.py -t seniorplay
