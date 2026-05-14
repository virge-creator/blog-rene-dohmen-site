---
title: 'Show hidden files on OSX'
date: '2013-12-12 20:37'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","tutorial"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

When you use a mac, unix style you sometimes want to see .file and
.folders. Here is how to do it:

``` {.bash}
defaults write com.apple.Finder AppleShowAllFiles TRUE;\killall Finder;\say Files Revealed
```

revert back:

``` {.bash}
defaults write com.apple.Finder AppleShowAllFiles FALSE;\killall Finder;\say Files Hidden
```
