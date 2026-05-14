---
title: 'Using a readonly filesystem with debian unstable'
date: '2011-03-10 00:14'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

Some intro about fsprotect: set of scripts to transparently mount a RAM
fs over the readonly root file system to protect the flash storage or to
protect from unwanted changes. (the idea is not to write anything to the
flash disk while system is running, this utility protects your system
from fs corruption after unexpected power downs.)

Fsprotect homepage has version 1.0.5 available for download in debian
package source format.

``` {.bash}
# apt-get update
# apt-get install fsprotect
# apt-get install aufs-tools
```

Then change /etc/default/fsprotect if you want to protect more then one
filesystem. To get it working with grub/grub2 -\> edit /etc/default/grub
and add fsprotect=1G to the kernel options. Remember to do a update-grub
afterwards.

After rebooting you can change everything you want; after the next
reboot you'll have a fresh system again. Because everything is mounted
RO its extremly power failure proof.
