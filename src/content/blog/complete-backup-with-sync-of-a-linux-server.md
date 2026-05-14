---
title: 'Do a complete backup with rsync of a linux server'
date: '2014-02-05 22:36'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

Create a exclude file: "exclude.rsync" with content:

``` {.bash}
/proc
/sys
/dev
/etc/udev
/etc/network
/boot
/etc/mtab
/etc/fstab
/var/swapfile
/lost+found
```

Create a file: /etc/rsyncd.conf on the server:

``` {.bash}
uid = 0
gid = 0
use chroot = no
max connections = 4
syslog facility = local5
pid file = /var/run/rsyncd.pid
munge symlinks = no
[sys]
path = /
comment = ftp area
allow from = your.ip.address
read only = yes
```

Start rsync with these options: (substitute the words in capitals with
the appropriate values)

``` {.bash}
rsync -avzRH --exclude-from=exclude.rsync rsync://SERVER_NAME_OR_IP:/sys TARGET_FOLDER
```
