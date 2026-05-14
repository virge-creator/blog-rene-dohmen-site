---
title: 'A quick way to make a USB bootable Ubuntu on OSX.'
date: '2012-11-16 18:42'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","javascript","linux"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

It's quite a long time since my last post. Very busy on new projects as
always and getting settled in the new house / office :)

The next post is mostly copied from Ubuntu.com. But I see it as a quick
reminder for my own Linux boot questions on mac. I keep forgetting the
keys and command's to work with diskimages. The created stick will be
bootable for most comps not only macs!

Note: this procedure requires that you create an .img file from the .iso
file you download.

1.  Convert the .iso file to .img using the convert option of hdiutil

``` {.bash}
hdiutil convert -format UDRW -o ubuntu1210_32.img ubuntu-12.10-desktop-i386.iso

Note: OS X tends to put the .dmg ending on the output file automatically.
```

2.  Run diskutil list to get the current list of devices.
3.  Insert your flash media.
4.  Run diskutil list again and determine the device node assigned to
    your flash media (e.g. /dev/disk2).
5.  Unmount the disk so dd can do its work. Run diskutil unmountDisk
    /dev/diskN (replace N with the disk number from the last command; in
    the previous example, N would be 2).

``` {.bash}
diskutil unmountDisk /dev/disk2

Note for the linux guys among us there is: $ diskutil unmount /dev/disk2s1
```

6.  Overwrite contents of USB stick with the bootable Ubuntu image.
    Warning stick content will be lost. Execute sudo dd
    if=/path/to/downloaded.img of=/dev/rdiskN bs=1m

``` {.bash}
sudo dd if=ubuntu1204_32.img.dmg of=/dev/rdisk2 bs=1m

Note: Using /dev/rdisk instead of /dev/disk may be faster
```

7.  Run diskutil eject /dev/diskN and remove your flash media when the
    command completes.

``` {.bash}
diskutil eject /dev/disk2
```

8.  Restart your Mac and press alt/option key while the Mac is
    restarting to choose the USB stick. (windows keyboard, windows key
    or alt)
