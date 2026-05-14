---
title: 'How do I verify how many CPU\''''s I have in the Terminal'
date: '2010-04-11 22:02'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

When working with video encoders or single core / multi core licenses
it's handy to now how much cores a CPU has, with only a terminal
available it's not that hard :-) **Linux** cat /proc/cpuinfo \*\* OS
X\*\* sysctl -n hw.ncpu
