---
title: 'Install pygame on Mac OSX via homebrew'
date: '2012-04-14 18:49'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","tutorial"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

The new and easy way is just use the package from pygame.org: as we
speak -\>

<http://www.pygame.org/ftp/pygame-1.9.2pre-py2.7-macosx10.7.mpkg.zip>

If you want to build it yourself this are the steps on a virgin OSX 10.7
system: *you 'll need Xcode 4.2*

Install mercurial from the .dmg from <http://mercurial.selenic.com/> Or
install mercurial via brew:

``` {.bash}
brew install mercurial
```

How to install to the brew supplied python.

``` {.bash}
brew install python
brew install sdl sdl_image sdl_mixer sdl_ttf smpeg portmidi
brew instal smpeg --HEAD
/usr/local/share/python/easy_install pip
/usr/local/share/python/pip install hg+http://bitbucket.org/pygame/pygame
```

With the brew installed python (2.7.3 as we speak) you can also install
py2app. I had some problems with py2app 0.6.4 and reported it to the
bugtracker, so I installed it with

``` {.bash}
/usr/local/share/python/easy_install py2app==0.6.3
```

``` {.bash}
```

``` {.bash}
```
