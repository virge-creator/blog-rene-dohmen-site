---
title: 'Cleanup boot partition on Ubuntu'
date: '2016-09-12 20:58'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","python","linux","git"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

If apt-get isn't functioning because your /boot is at 100%, you'll need
to clean out /boot first. This likely has caught a kernel upgrade in a
partial install which means apt has pretty much froze up entirely and
will keep telling you to run apt-get -f install even though that command
keeps failing.

The cause
=========

With a small boot partition and UnAttended upgrades on; a

The solution
============

Warning: only use this way of cleaning the boot partition when you tried
to solve it first with apt-get itself: e.g.

``` {.bash}
sudo dpkg --list 'linux-image*'
```

Then delete unneeded kernels with:

``` {.bash}
sudo apt-get remove linux-image-VERSION
```

replacing VERSION with the linux kernel versions you want to remove. If
that yields an error like:

``` {.bash}
dpkg: dependency problems prevent removal of linux-image-3.13.0-79-generic:
linux-image-extra-3.13.0-79-generic depends on linux-image-3.13.0-79-generic. dpkg:
error processing package linux-image-3.13.0-79-generic (--purge):
dependency problems - not removing Errors were encountered while processing:
linux-image-3.13.0-79-generic
```

Then this solution is for you.

List kernels that you can remove
--------------------------------

Get the list of kernel images and determine what you can do without. The
next command will list all installed kernels .

``` {.bash}
sudo dpkg --list 'linux-image*'|awk '{ if ($1=="ii") print $2}'|grep -v `uname -r`
```

Remove unneeded/unwanted kernels
================================

Craft a command to delete all files in /boot for kernels that don't
matter to you using brace expansion to keep you sane. Remember to
exclude the current and two newest kernel images. Example:

``` {.bash}
sudo rm -rf /boot/*-3.13.0-{68,70,71,72,73}-*.
```

Fix apt
-------

to clean up what's making apt grumpy about a partial install:

``` {.bash}
sudo apt-get -f install
```

If you run into an error that includes a line like "Internal Error:
Could not find image (/boot/vmlinuz-3.13.0-68-generic)", then run the
command

``` {.bash}
sudo apt-get purge linux-image-3.13.0-68-generic
```

(with your appropriate version).

Finally, sudo apt-get autoremove to clear out the old kernel image
packages that have been orphaned by the manual boot clean.

Install updates/upgrades
------------------------

Optionally: run

``` {.bash}
sudo apt-get update
```

and

``` {.bash}
sudo apt-get upgrade
```

to take care of any upgrades that may have backed up while waiting for
you to discover the full /boot partition.

Eliminating the root cause
==========================

You can turn on autoremoval of unneeded software after you unattended
security updates by uncommentng an option in
`/etc/apt/apt.conf.d/50unattended-upgrades`: Look for this line:
`// Do automatic removal of new unused dependencies after the upgrade // (equivalent to apt-get autoremove) Unattended-Upgrade::Remove-Unused-Dependencies "true";`

Then apt-get autoremove is executed after each unattended upgrade.

The alternative
===============

Someone wrote a small python program that does this for you:
<https://github.com/EvanK/ubuntu-purge-kernels> Use at your own risk.
