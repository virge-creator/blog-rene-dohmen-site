---
title: 'First attempt to get Wiimotes working with Ubuntu Lucid'
date: '2010-08-23 21:27'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

On Ubuntu 10.10 you install the software with:

sudo apt-get install libcwiid1 lswm wmgui wminput

You can test as an normal user if it works with wmgui; It's capable of
finding the wiimote and showing current status, like which button is
pressed etc.

After you confirmed it's working; run:

lswm Put Wiimotes in discoverable mode now (press 1+2)\...
00:27:09:78:5F:F4

Use the address you found to get it working as a mouse:

sudo wminput 00:27:09:78:5F:F4
