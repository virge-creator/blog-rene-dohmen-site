---
title: 'Configure multicast network traffic to go over a specific network interface on linux'
date: '2013-08-24 23:47'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","tutorial"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

I'm using eth2 to connect to a seperate LAN with only some multicast
video streams on it. On my linux comp I have to force listening for
multicast to eth2; here is how to do it.

``` {.bash}
route add -net 224.0.0.0 netmask 240.0.0.0 dev eth2
```
