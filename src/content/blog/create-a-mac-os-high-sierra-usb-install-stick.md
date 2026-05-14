---
title: 'Create a Mac OS High Sierra usb install stick'
date: '2018-08-20 06:37'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

There a numerous GUI program's out there to create a stick but's it
super duper easy to do it from the terminal as the App store image
contains a shell script that does it for you with just one Terminal
command. So go ahead download a fresh copy of Mac OS High Sierra via the
app store, connect a 8Gb or more USB stick and fire up your terminal.

``` {.bash}
$ sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia \
--volume /Volumes/Yourstickname --applicationpath \
/Applications/Install\ macOS\ High\ Sierra.app/
```

Of course you have to substitute the "Yourstickname" with the name of
your stick. You can find's it name by typing `mount` in a terminal.
