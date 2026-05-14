---
title: 'Convert a whole bunch of video files to .ogv theora format in one command'
date: '2013-09-14 03:39'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux","music"]
thumbnail: '/images/thumbnails/video.jpg'
status: 'published'
---

Just a short post as a reminder for myself. We do use a lot of ogv's in
our Narrow casting shows. When you use ffmpeg2theora with a Linux or OSX
kinda system you can convert a whole folder with video's like this:

``` {.bash}
cd videofiles
for file in *.avi; do ffmpeg2theora "$file"; done
```

Or with some more options, like video quality 9 (default 6, max 10),
optimize files and put it some tag info:

``` {.bash}
for file in *.mov; do ffmpeg2theora --videoquality 9 --optimize --organization Formatics "$file"; done
```

Output:

``` {.bash}
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'BTP mannetje en BTP3D model.mov':
  Metadata:
    major_brand     : qt
    minor_version   : 537199360
    compatible_brands: qt
    creation_time   : 2013-09-14 03:30:40
  Duration: 00:00:46.32, start: 0.000000, bitrate: 14213 kb/s
    Stream #0:0(eng): Video: mpeg4 (Advanced Simple Profile) (mp4v / 0x7634706D), yuv420p, 1920x1080 [SAR 1:1 DAR 16:9], 14211 kb/s, 25 fps, 25 tbr, 600 tbn, 1k tbc
    Metadata:
      creation_time   : 2013-09-14 03:30:40
      handler_name    : Apple Alias Data Handler
  Pixel Aspect Ratio: 1.00/1   Frame Aspect Ratio: 1.78/1

  0:00:45.79 audio: 0kbps video: 1743kbps, ET: 00:00:01, est. size: 9.6 MB
  0:00:46.32 audio: 0kbps video: 1731kbps, time elapsed: 00:02:35
```
