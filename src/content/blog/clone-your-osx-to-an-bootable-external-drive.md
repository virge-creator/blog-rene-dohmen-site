---
title: 'Clone your OSX to an bootable external drive'
date: '2013-10-19 11:48'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","tutorial"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

Time Machine is great for everyday backups and simple file restores, but
it only gives you the ability to restore your system after reinstalling
OS X. It literally takes forever to restore a complete timemachine
backup to a new mac. But what if disaster hits, and you don't have this
kind of luxury? A full clone of your Mac's hard drive can really help
get you back up and running in a matter of minutes. Read on to find out
how to make a bootable clone of your Mac's main hard drive and come
back from a data disaster.

What You Need: External drive as large as your internal drive (USB or
FireWire) Carbon Copy Cloner (around \$ 40,-)

To begin, connect your external drive and open Disk Utility (located in
Applications/Utilities/). Once opened, click on your drive in the
sidebar, and click on the Partition tab.

Ensure that "1 Partition" is selected from the drop-down menu labeled
"Partition Layout". Next, specify a name, and select "Mac OS Extended
(Journaled)" from the Format drop-down menu. Finally, click on the
Options button near the bottom of the window.

In the new dialog, ensure that "GUID Partition Table" is selected, and
then click the OK button. This setting will enable the disk to be booted
from.

Click the Apply button to apply the partition changes; you will be
prompted to accept the changes by clicking on the Partition button in a
pop up dialog. After a few minutes, the drive will be reformatted, and
the partition changes will be applied.

2.  Clone that drive!
