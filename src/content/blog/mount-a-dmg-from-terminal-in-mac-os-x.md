---
title: 'Mount a .dmg from Terminal in Mac OS X'
date: '2012-04-14 18:25'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

If you are a Terminal user you might want to mount .dmg files from
commandline.

Basically thats pretty easy:

Mount a DMG
===========

``` {.bash}
$ hdiutil attach /path/to/myDMGname.dmg
```

If you want to see how it's mounted: do a:

``` {.bash}
$ mount
```

Unmounting it again
===================

Substitute "DiskImageName" with the actual name.

``` {.bash}
$ umount /Volumes/DiskImageName
```

Thats it.
