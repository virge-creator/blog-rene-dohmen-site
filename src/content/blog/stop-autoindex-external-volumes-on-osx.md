---
title: 'Stop OSX from automatically indexing external disks'
date: '2013-12-12 17:05'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

You have a couple of options here. You can either prepare the disk; so
OSX knows to not index them, configure it from System Preferences or
disable it completely.

All external Disks
==================

The secret is that all external volumes are mounted into /Volumes

So open up Terminal in an account with Admin privileges. Enter "open
/Volumes" and return. This will open the folder in the Finder. Now open
your Spotlight System prefs pane and click on "Privacy". Drag the icon
at the top of the Folder window "Volumes" and drop it into the list.
You've now added the /Volumes folder to the places not to index and now
inserting a USB should not cause it to be indexed.

You could also do this without GUI:

create an empty file on the root of the volumes: *.metadata_never_index*

``` {.bash}
sudo touch /Volumes/.metadata_never_index
```

Per Disk
========

If you like the indexing of external disk, and just want to disable it
for a single disk:

``` {.bash}
sudo touch /Volumes/DISK_NAME/.metadata_never_index
```
