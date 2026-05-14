---
title: 'Using your FreeNAS root account'
date: '2014-04-03 13:35'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","ssh"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

To get full rsync backups from a server on your FreeNAS box you have a
couple of options. It took me some time to get used to the read-only FS
regarding the / partition. When you want to login on another server with
your root account you'll get a SSH alert that you have to confirm with
"yes". Obviously this will not be saved on the read-only FS. So to get
this working you have to remount / with write partitions, do your change
and remount readonly again.

``` {.bash}
mount -uw /
vi /etc/rc.conf
mount -ur /
```
