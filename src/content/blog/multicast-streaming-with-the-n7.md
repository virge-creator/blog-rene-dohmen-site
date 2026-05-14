---
title: 'Howto setup multicast streaming with the Anysee N7 network tuner'
date: '2013-05-23 10:00'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

Normally you connect to the N7 network tuner via HTTP protocol. That's
fine for a simple, single TV screen setup. If you want to watch
television on multiple devices this won't work simultaneous. So I
started exploring the multicast streaming capabilities of the Anysee N7
network tuner. My first attempts were very discouraging, when I started
the stream, my WIFI router (linksys WRT54GL) crashed immediately. Most
of the time I tried to play the multicast stream with MPlayer but it
needed a long time (\> 30s) before it started playing at all. So after I
bought a new WIFI router I tried it again with VLC. VLC seems to be the
best Open Source multicast player out there at the moment; it can start
playing a HD stream in less then a second with the setup I'll describe
below.

For best results you should isolate the N7 network from your normal LAN
either by using a separate LAN or by using a intelligent switch that
support VLAN's; a multicast HD stream can consume up to 55 Mbit. At the
end I settled for this setup, giving me 3 stand alones players that can
tune to the stream in under 1 sec, and a media server to convert the
stream to other formats that can be used in the rest of the internal LAN
when needed. (iPad/iPhone/other VLC users):

Image: multicast-N7.png

I had some problems on windows when using DHCP for the second network
card (the DHCP server did fill in a gateway by default, I couldn't just
leave it empty); Some additional routing was needed to allow internet
access on the players. At last I just configured static IP's for all
the devices on the second LAN without a gateway/DNS so the players would
uses LAN1 for internet access.

Settings on N7
==============

Image: http://www.renedohmen.nl/blog/wp-content/uploads/2013/04/multicast-setup-n7.png

Settings for VLC
================

just play the stream <udp://@239.255.255.100:4567>

With command line extension

``` {.bash}
cvlc udp://@239.255.255.100:4567
```

Settings for PS3 Media server
=============================

I just used a small conf file to tell PS3 mediaserver about the
multicast stream. Create a WEB.conf in \~/.config/PMS/ with the
following contents:

``` {.bash}
#Multicast stream is enabled
videostream.Web,TV=Multicast HD channel1,udp://@239.255.255.100:4567,http://www.renedohmen.nl/files/tv.jpg
```
