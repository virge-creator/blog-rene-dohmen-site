---
title: 'Using PS3 mediaserver to stream video\''''s to iPhone/iPad'
date: '2012-01-26 01:50'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

The last [Playstation media
server](https://code.google.com/p/ps3mediaserver/) has excellent support
for streaming (transcoded) video straight to the iPad or Iphone. Because
it uses upnp it can also stream to boxee, xbmc, VLC, Xbox 360 and of
course the Play station 3. I used a commercial app, airplayer, on a
iPhone 4 and a 3GS to test it and was very happy to find out that it can
also open live streams from my network TV tuner, transcode it to mp4 and
serve it on the fly to a iPhone 3GS.

Install PS3 Media Server:
<https://code.google.com/p/ps3mediaserver/downloads/list>

Image: tv1.png

I used PS3 Media Server 1.50.0 on Ubuntu 12.04. With the default
settings all streams and conversion are done by VLC. I don't know if
you need to install VLC, mplayer and mencoder yourself but as a media
geek I have them installed anyway. Then I added some shares with a
couple of test videos in it. With most ,cheap or free, iPhone apps that
can use a upnp/dnla mediaserver I was able to playback some .mp4 files
(already in correct iPhone format), but it didn't start transcoding for
divx or xvid movies.

Image: srces1.png

It seems that PS3 Mediaserver uses some HTTP User Agent detection
mechanisme and tries to load the best transcoding profiles based on the
expected video render platform. When looked in the renderers folder (in
the PS3 Mediaserver source) I discovered a profile with that name
AirPlayer.conf. So I bought Airplayer in the app store and it discovered
the media server in my network. Video playback works OK now for the
files on disk, of course you need to have a decent computer for
transcoding 720p or 1080p material on the fly to a format that the
iPhone can play.

> **Next step: restream a live video stream to the iPhone.**

I have a N7 Network TV tuner that plays mpeg2 TS streams, Unfortunately
that's not playable with any apps that I know about in the app store.
So after some reading in the docs and config files I added my N7 streams
to WEB.conf and copied the file to \~/.config/PMS/WEB.conf and restarted
the media server.

My WEB.conf:

``` {.bash}
# video feeds
#All in one folder
videostream.Web,TV=Nederland 1,http://tv:8080/chlist/0001,http://www.anyseedirect.eu/images/nederland_1.png
videostream.Web,TV=Nederland 2,http://tv:8080/chlist/0002,http://www.anyseedirect.eu/images/nederland_2.png
videostream.Web,TV=Nederland 3,http://tv:8080/chlist/0003,http://www.anyseedirect.eu/images/nederland_3.png
videostream.Web,TV=Comedy central,http://tv:8080/chlist/0014,http://www.anyseedirect.eu/images/comedy_central_kind.png
videostream.Web,TV=Discovery HD Showcase,http://tv:8080/chlist/0062,http://www.anyseedirect.eu/images/http://www.anyseedirect.eu/images/discovery_hd_showca.png

# video feeds
#All in seperate folder
videostream.N7,Nederland 1=Nederland 1,http://tv:8080/chlist/0001,http://www.anyseedirect.eu/images/nederland_1.png
videostream.N7,Nederland 2=Nederland 2,http://tv:8080/chlist/0002,http://www.anyseedirect.eu/images/nederland_2.png
videostream.N7,Nederland 3=Nederland 3,http://tv:8080/chlist/0003,http://www.anyseedirect.eu/images/nederland_3.png
videostream.N7,Comedy Central=Comedy central,http://tv:8080/chlist/0014,http://www.anyseedirect.eu/images/comedy_central_kind.png
videostream.N7,Discovery HD=Discovery HD Showcase,http://tv:8080/chlist/0062,http://www.anyseedirect.eu/images/http://www.anyseedirect.eu/images/discovery_hd_showca.png
```

the "<http://tv>" URL's points to the N7 network tuner. (I like
names, so yes I called it tv)

With the above setup I got some problems with the first part of the conf
file: all TV channels in one folder (it looks like PMS is trying to make
thumbnails or prefetches some stuff from the next channel, and yes I
disabled thumbnails in the PMS settings). The last lines in the conf
file are useable: it makes seperate folders for each channel.

Startup times are about 4 seconds for a channel switch for a channel
with SD content.

**Photoos running Airplayer on iPhone:**
Image: IMG_20120126_020104.jpg
Image: IMG_20120126_022845.jpg

**Photoos running UPnPlay on Android (Nexus):**

Image: foto-2.jpg
Image: foto-1.jpg
