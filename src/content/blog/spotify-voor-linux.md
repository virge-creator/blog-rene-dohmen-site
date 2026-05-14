---
title: 'Spotify voor linux !'
date: '2011-11-01 23:48'
author: 'acidjunk'
category: 'Computerz, Muziek'
tags: ["Computerz, Muziek","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

Er was eerst een niet werkende manier om via wine onder ubuntu de
spotify client te gebruiken. Dat leverde na veel gepiel een crashende
player op.

Nu is er gelukkig een beta preview:
<http://www.spotify.com/nl/download/previews/>

Quick install: 1. Add this line to your list of repositories in
/etc/apt/sources.list

``` {.bash}
deb http://repository.spotify.com stable non-free
```

2.  Add public key

``` {.bash}
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 4E9CFF4E
```

\# 3. Run apt-get update

``` {.bash}
sudo apt-get update
```

\# 4. Install spotify!

``` {.bash}
sudo apt-get install spotify-client-qt
```
