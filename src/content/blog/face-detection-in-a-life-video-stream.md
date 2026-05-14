---
title: 'Face detection in a life video stream'
date: '2010-08-13 21:52'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","python","linux","tutorial"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

For one of our software projects where investigating the possibilities
of the Open Source image processing library*opencv*.

When installing openCV from the ubuntu packages it goes wrong with the
python bindings for example. So I followed the instructions at
<http://opencv.willowgarage.com/wiki/InstallGuide%20%3A%20Debian> to get
a working version. I used the OpenCV from sourceforge stable. Both the
listed SVN version fail to compile at my workstation\...

So yes it's a bitch; but it's powerfull

Instead of the build instruction with make I had to replace make with
cmake:

``` {.bash}
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D BUILD_PYTHON_SUPPORT=ON -D BUILD_EXAMPLES=ON ..
```

Then i did:

``` {.bash}
make -j4
```

Then i did a make in the samples/c dir to build all the samples. All the
samples build correctly.

This Is the facedetect algorithm; it detects one or more faces in a live
video stream.

With some extra work I alos got it working on the MAC; the most easiest
way is to download a Universal binary of OpenCV-2.0 with some patches;
it will work ass an Mac OSX Framework straight from xCode.

I usedthe description at
<http://opencv.willowgarage.com/wiki/Mac_OS_X_OpenCV_Port> to get it
running; I downloaded the DMG for the framework from:
<http://vislab.cs.vt.edu/~vislab/wiki/images/4/44/OpenCV2.0.dmg>

Have fun: this is it working with Snow Leopard:

It will detect all (human) faces with a reasonable accuracy:

Image: Schermafbeelding-2010-08-14-om-17.54.37.png

Image: Schermafbeelding-2010-08-14-om-17.39.103.png
