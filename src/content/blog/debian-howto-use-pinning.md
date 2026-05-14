---
title: 'Debian : howto use pinning'
date: '2010-12-11 21:19'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

In a recent attempt to use the latest intel driver on my debian squeeze
testing box to avoid a problem which is most likely described here:

<https://bugs.freedesktop.org//show_bug.cgi?id=31367>

So I needed only Xorg from the unstable repo; this is what I did:

The first step is to set up your `/etc/apt/sources.list` to include your
typical Stable, plus the Testing/Unstable sources that you want.

``` {.bash}
#Testing
deb http://ftp.nl.debian.org/debian testing main contrib non-free
deb-src http://ftp.nl.debian.org/debian testing main contrib non-free

deb http://security.debian.org/ testing/updates main contrib non-free
deb-src http://security.debian.org/ testing/updates main contrib non-free

#Unstable
deb http://ftp.nl.debian.org/debian unstable main non-free contrib
```

Then edited /etc/apt/preferences:

``` {.bash}
Package: *
Pin: release a=testing
Pin-Priority: 650

Package: *
Pin: release a=unstable
Pin-Priority: 600
```

Then I learned that debian also has an experimental branche, and the
package i wanted existed in experimental only. When I started buidling
on thes debian machine i used squeeze, so my apt file contained
references to squeeze. From reading the apt en the debian docs I found
that squeeze == testing, sid == unstable. So i had to rename all
references of "squeeze" in the /etc/apt/sources.list to "testing"
Ended up with this /etc/apt/sources.list:

``` {.bash}
# ACID: apt file, pinning preference can be found in /etc/apt/preferences

#Testing
deb http://ftp.nl.debian.org/debian/ testing main contrib non-free
deb-src http://ftp.nl.debian.org/debian/ testing main contrib non-free

deb http://security.debian.org/ testing/updates main contrib non-free
deb-src http://security.debian.org/ testing/updates main contrib non-free

#Unstable
deb http://ftp.nl.debian.org/debian/ unstable main contrib non-free

#Experimental :
#ACID: Needed for xorg 2.14: 25-01-2011
deb http://ftp.nl.debian.org/debian/ experimental main contrib non-free
```

/etc/apt/preferences:

``` {.bash}
Package: *
Pin: release a=testing
Priority: 650

Package: *
Pin: release a=unstable
Priority: 600

Package: *
Pin: release a=experimental
Priority: 500
```
