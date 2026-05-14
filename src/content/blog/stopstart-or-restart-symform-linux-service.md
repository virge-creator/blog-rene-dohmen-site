---
title: 'Stop/Start or Restart Symform linux service'
date: '2014-12-19 14:04'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript","linux","ssh","tutorial"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

The Symform daemon is not a default Linux service so it took me a while
to figure out how to start and stop it.

Linux and NAS Devices: Run command "/opt/symform/SymformNode.sh
restart" from the ssh terminal window connected to your device to
restart all services except (Updater service) on your device. You can
also use the following commands:

To start:

``` {.bash}
/opt/symform/SymformNode.sh start sync
/opt/symform/SymformNode.sh start contrib
/opt/symform/SymformNode.sh start web
```

To stop:

``` {.bash}
/opt/symform/SymformNode.sh stop sync
/opt/symform/SymformNode.sh stop contrib
/opt/symform/SymformNode.sh stop web
```

To start updater service:

``` {.bash}
sh /opt/symform/scripts/SymformUpdater.sh
```
