---
title: 'Clean up a Ubuntu server boot partition'
date: '2015-11-13 21:47'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

When you choose the default partition plan on a Ubuntu server you likely
end up with a small boot partition.

If you don't reboot your server on a regular basis you have a rather
big chance of a full boot partition after a couple of automatic updates.

2 options:

Option 1: you have a bit space left

When you apt-get is stell working normally you can do this to purge
older kernels:

Show current running kernel: uname -r

Show installed kernels dpkg \--list 'linux-image\*' \| grep \^ii

Delete all kernels excepts for the running kernel and the kernel with
the highest number:

Purging a kernel: apt-get purge linux-image-3.13.0-51-generic

After that you can run a apt-get autoremove
