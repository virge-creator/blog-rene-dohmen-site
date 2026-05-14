---
title: 'Installing AIR on Ubuntu 11.10 and 12.04'
date: '2012-10-06 01:11'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

Why did Adobe decide to discontinue further support for Adobe AIR for desktop Linux®?
=====================================================================================

As the market shifts to mobile devices, Adobe is investing in bringing
its runtime technologies to new hardware and operating systems. Adobe is
increasingly investing in mobile authoring. The recent Creative Suite
5.5 release is focused on enabling customers to deliver their
experiences across devices using Adobe's technologies. Adobe has
responded to the changing market trends by providing AIR support for a
growing number of platforms. These platforms include Android, iOS and
BlackBerry Tablet OS, televisions, and set-top boxes. Lifetime AIR for
Linux desktop downloads represent less than 0.5% of total AIR desktop
downloads, which number over 450 million. Therefore, Adobe has decided
to change the distribution model for Linux and direct these resources
toward its mobile efforts. Adobe's efforts are focused on supporting
operating systems that are most important to its customers, and that
demonstrate the greatest opportunity for future growth for its partners
and developers. Adobe continues to provide partners the opportunity to
license source code through the Open Screen Project. You can download
AIR 2.6, the last version to support Linux, at the archive build page.

Adobe no longer supports the full AIR developer SDK for desktop Linux
implementations. And, the AIR Debug Launcher (ADL) is no longer
supported in the SDK.

Add canonical partners repo to system and install flash and AIR goodies:

``` {.bash}
sudo apt-add-repository "deb http://archive.canonical.com/ $(lsb_release -sc) partner"
sudo apt-get update && sudo apt-get install flashplugin-installer acroread
```

Download latest supported version here:

``` {.bash}
wget http://airdownload.adobe.com/air/lin/download/latest/AdobeAIRInstaller.bin
```

With Ubuntu 11.10 32 or 64 bit the installer just work. When running
12.04 you will get an error about missing Gnome Keyring.

Image: Schermafbeelding-2012-10-02-om-01.08.25.png

After some googling I found a forum with an solution; it involves
creating some symlinks:

**AIR on 32 bit Ubuntu 12.04**

``` {.bash}
sudo ln -s /usr/lib/i386-linux-gnu/libgnome-keyring.so.0 /usr/lib/libgnome-keyring.so.0
sudo ln -s /usr/lib/i386-linux-gnu/libgnome-keyring.so.0.2.0 /usr/lib/libgnome-keyring.so.0.2.0
```

**AIR on 64 bit Ubuntu 12.04**

``` {.bash}
sudo ln -s /usr/lib/x86_64-linux-gnu/libgnome-keyring.so.0 /usr/lib/libgnome-keyring.so.0
sudo ln -s /usr/lib/x86_64-linux-gnu/libgnome-keyring.so.0.2.0 /usr/lib/libgnome-keyring.so.0.2.0
```
