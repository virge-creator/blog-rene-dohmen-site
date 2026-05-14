---
title: 'Hacking gnome: screwed up? A quick gnome restore guide'
date: '2010-02-26 21:37'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","tutorial"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

While working on the braintrainer hardware it's quite easy to screw up
the gnome session. So here is a quick howto to restore a screwed up
gnome almost to it's default configuration without having to remove or
add a user. Ditch the hidden gnome user pref folders in your home
directory. When you log back into Gnome a new default set will be
re-created.

The folders to remove are: .gconf, .gconfd, .gnome, .gnome2,
.gnome2_private
