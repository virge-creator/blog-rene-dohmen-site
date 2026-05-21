---
title: 'Some fruity apps & solutionz for your raspberry pi board'
date: '2013-01-18 21:04'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","git","nginx","ansible","music"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

In the firtst quarter of 2012 some early ARM based android boards where
released. I followed them with much interest but didn't found it very
suitable for human beings; without a touch screen an android OS needs a
lot of tweaking to get a working envirooment in which you can easily
install lots of software. The are some android boards available already;
but the Raspberry is something different; It's a ARM based linux device
with roughly the same CPU & GPU power as the first Xbox.

![Raspberry_Pi_Photo.jpg](/images/posts/some-fruity-apps-solutionz-for-your-raspberry-pi-board/Raspberry_Pi_Photo.jpg)

I got my first one from a client and it had OpenElec & XBMC 12.0 on it.
697.95 BogoMips on ARMv6 rev 7 -\> with a BCM2708 serie (the BCM2835)
and 512MB RAM. The preinstalled XBMC works fine; it played most of the
video content. Even most of my 1080p content did work out of the box.

<!-- Image not found: original-300x168.jpg -->

Running debian
==============

Downloaded from:
[here](http://downloads.raspberrypi.org/download.php?file=/images/raspbian/2012-12-16-wheezy-raspbian/2012-12-16-wheezy-raspbian.zip).
I played around with it a little bit; and it's a fast booting, easy
installing complete OS; if you are used to "apt-get install". I just
did a dd to copy it to a flash card; Et voila; a booting debian OS.

When working with video on the Raspberry Pi running on Debian; You 'll
run into some stuff. Lots of confusing info on the web: The CPU of
RaspberryPi is quite low-end and it can't really decode video at decent
speed (even SD MPEG2). Hardware acceleration has to be used but by
default only H264 can be hardware accelerated. You can buy a licence key
to enable additional hardware decoders from RPi foundation (currently
you can buy MPEG2 and VC-1 license). The graphics chip on RaspberryPi is
very powerful and if video is encoded with a format supported by the
hardware decoder, it can easily play HD content 1080p. But you will have
to transcode all your material that is in different formats. Hardware
decoding only works with dedicated video player (omxplayer). It is used
by RaspBMC so if you plan on using this solution, you should have no
problem. If you are planning on running your own distribution, you have
to integrate omxplayer. Also bear in mind that omxplayer is quite a
young project and while it's quite stable, it's not perfect (like most
things on RPi dedicated software). Normal graphical environment (X
server) does not use accelerated graphics. This is why you found some
informations about slow GUI rendering. AFAIK XBMC is using OpenGL ES
which does use hardware acceleration so it's not a problem if you plan
on using it. There are some problems with sound as it's drivers are not
good quality right now. You may hear some glitches in audio.

There are also problems with USB on Rpi, this wont let you use USB card
to make audio problems go away. And since network chip is also connected
using USB, there may be some glitches. Most of them are addressed right
now in new versions of software but there may be some more. We some
fiddling around it possible to get WIFI & or 3G working. Easy battery
power is also available.

You can even install an app store with paid apps for the raspberry pi:

``` {.bash}
sudo apt-get update && sudo apt-get install pistore
```

Or use it as an Super Nintendo Emulator :)

Some solutionz that can be expected and are within reach
========================================================

Webcam server, Vehicle tracking (using an add-on GPS module), Streaming
internet radio box, IPTV watcher, Airplay receiver, Vehicle Diagnostics,
Baby monitor, Media server by adding a couple of USB hard drives, Media
Center (XBMC), Video chat, Game emulator, running MAME (build your own
arcade cabinet?), Network Attached Storage setup (NAS), Mini web server,
FTP server, Proxy server, Firewall (Wireless, 2nd ethernet via USB or 3G
router), Portable Media PC, Run an alarm system, Security webcam (with
motion sensor), Control garden lighting, Control sprinkler system,
Wearable computer, HTPC for TV web browsing, In car Computer, Thin
client computer, Game server, IRC / chat server, build a cheap laptop,
build a cheap tablet, create a digital photo frame, Asterisk, Home
automation system, MP3 player, Wall hanging screen with voice control
for network pictures, weather, news and RSS feeds, Cyber Cafe computer,
Video conferencing system, Personal weather station / logger, Control a
light display, Control an LED board, put it in an old mac classic or mac
plus case as a general purpose computer, Ultra portable wardriving
setup, A dedicated Synth, possibly with touch screen, Solar powered
desktop computer, CNC controller, High tech birthday / Xmas presents,
Backup server, RSS ticker, High tech alarm clock, Mini projector, DOSBox
for games, Processing farm for , Cafe media player, Brains
for Arduino setup, Mumble server, Industrial manufacturing controller,
BitTorrent seedbox, Family notice board, Car black box with video,
Robotic telescope / camera controller, Display photographer portfolio
images, BitTorrent client, SMS gateway, Building your own printserver,
creating a water drop
