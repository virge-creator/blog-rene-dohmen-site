---
title: 'Zip only certain files and keep the directory structure intact'
date: '2013-01-10 20:55'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

I needed a backup of only the C\# sources in a big folder with Unity3d
projects on a mac. It took me a while to find the correct syntax.
Instead of copying; I let zip do the hard work; and then just unzip it
somewhere else.

One folder above your UnityProjects folder:

``` {.bash}
find . -name "*.cs" -print| zip source -@
```
