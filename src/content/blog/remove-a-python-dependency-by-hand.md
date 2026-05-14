---
title: 'Remove a python dependency by hand'
date: '2013-05-29 17:47'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

If you are on a system without pip or easyinstall, and you can't use
the OS package system: You need to remove all installed files manually,
and also undo any other stuff that the installation did manually.
Changes are that you don't know the list of all files it installed, you
can reinstall it with the \--record option, and take a look at the list
this produces.

``` {.bash}
python setup.py install --record files.txt
```

And when you think the list is complete:

``` {.bash}
cat files.txt | xargs rm -rf
```
