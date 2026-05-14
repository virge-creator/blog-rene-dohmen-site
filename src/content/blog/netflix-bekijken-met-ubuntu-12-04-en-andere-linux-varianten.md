---
title: 'Netflix bekijken met Ubuntu 12.04 en andere Linux varianten'
date: '2013-10-15 23:36'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

Met de komst van Netflix naar Nederland heb ik uiteraard een abonnement
afgesloten om het het eens op mijn gemakt te gaan testen. Mac OSX,
Windows -\> werkt prima gewoon vanuit de browser. Door de DRM protectie
en het gebruik van Microsoft Silverlight is het op dit moment echter
onmogelijk met de standaard Linux browsers netflix te kijken. Met een
klein beetje werk installeer je echter PipeLight; die dan weer een
gepatchte versie van wine gebruikt om Netflix in Firefox en Chrome
mogelijk te maken. Op mijn oude Quad core gebruikt dit wel redelijk
permanent 1 volledige core.

Klinkt lastig? het valt gelukkig mee; er zijn 3th party builds
beschikbaar in Ubuntu repo's. Quick install:

``` {.bash}
sudo apt-add-repository ppa:ehoover/compholio
sudo apt-add-repository ppa:mqchael/pipelight
sudo apt-get update
sudo apt-get install pipelight-multi
sudo pipelight-plugin --enable silverlight
```

Dit werkt op Ubuntu 13.10 Saucy Salamander, Ubuntu 13.04 Raring
Ringtail, Ubuntu 12.10 Quantal Quetzal, Ubuntu 12.04 Precise Pangolin,
Linux Mint 16 Petra, Linux Mint 15 Olivia, Linux Mint 14 Nadia, Linux
Mint 13 Maya en Elementary OS 0.2 Luna. Fullscreen werkt bij mij alleen
op de primary monitor. Verder werkt het super :)

Image: Screenshot-from-2013-10-16-020726.png
Image: Screenshot-from-2013-10-16-023021.png
