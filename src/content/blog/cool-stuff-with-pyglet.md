---
title: 'Cool stuff with Pyglet'
date: '2010-09-27 21:30'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

I installed pyglet with the installer for the mac to check out video
support and some opengl performance tests.

After some struggling with 64 bit python on the mac i got the examples
running by setting python to 32bit:

``` {.bash}
export VERSIONER_PYTHON_PREFER_32_BIT=yes
```

When you don't do it you'll get this error;

``` {.bash}
OSError: dlopen(/System/Library/Frameworks/QuickTime.framework/QuickTime, 6): no suitable image found.  Did find:
    /System/Library/Frameworks/QuickTime.framework/QuickTime: no matching architecture in universal wrapper
    /System/Library/Frameworks/QuickTime.framework/QuickTime: no matching architecture in universal wrapper
```

The examples are really cool and the python video player supports divx,
mkv and h264; Performance is very good; only tested it on my imac so far
