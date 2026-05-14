---
title: 'Enabling front speakers of MSI AE2050 on Ubuntu 11.10'
date: '2011-11-11 20:11'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","music"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

With kernel 3.0 sound via speaker output stopped working on the
all-in-one [MSI
AE2050](http://www.msi.com/product/aio/Wind-Top-AE2050.html).

Output with headphone works OK, but the buildin speakers are never used.
When using and an 2.36 or above kernel it worked OK, with one small bug
-\> a connected headphone would leave the speakers on.

I tried a couple of approaches to keep sound and touch, at last the
solution was simple: install the latest ALSA release based on the
nightly build as provided by the Ubuntu audio team.

It's called DKMS Alsa driver you can download a .deb from
[here](https://launchpad.net/~ubuntu-audio-dev/+archive/alsa-daily/+packages)
or add it as ppa, instructions
[here](https://launchpad.net/~ubuntu-audio-dev/+archive/alsa-daily/+index#).

One, small problem, the speakers are muted when the volume drops below
70%, and I'll still need to test this on the BTP os.
