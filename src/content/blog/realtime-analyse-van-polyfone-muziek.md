---
title: 'Realtime analyse van polyfone muziek'
date: '2011-02-12 11:07'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux","git","music","tutorial"]
thumbnail: '/images/thumbnails/music.jpg'
status: 'published'
---

Voor een project waren we op zoek naar een snelle muzikaal accurate
tuner applicatie. Na een beetje browsen kwam ik dit tegen:

<http://clam-project.org/>

Cool; laatste SVN trunk gedownload, paar ubuntu dependencies isntallen,
compilen en runnen.

Viel in de praktijk natuurlijk toch weer een beetje tegen, de INSTALL is
redelijk duidelijk, maar je moet eerst CLAM compilen dan de
NetworkEditor, en dan pas ChorData.

En dan goed uitkijken dat je de NetwerkEditor en Chordata compiled met
de opties

``` {.bash}
scons prefix=/usr/local clam_prefix=/usr/local
```

Hierna kan ik na het aanroepen van ldconfig chordata vanuit een terminal
starten met chordata:

Het werkt dan op MP3's; je voert het een mp3 hij doet een snelle
preplay analyse en speelt dan het nummer af, terwijl het informatie
geeft over:

-   welk akkoord er te horen is
-   welke noten er tegelijkertijd te horen zijn
-   hoe het frequentie spectrum verdeeld is

Er is ook een tutorial van hoe je de NetwerkEditor en de QT4 widgets kan
gebruiken om zelf de ChorData te bouwen.

Het mooie is dat je dus een audio engine kan designen bijvoorbeeld
specifiek om gitaar akkoorden te herkennen; dan bouw je er in een MUM
van tijd een GUI omheen, waarbij je kan kiezen uit al wat bestaande
widgets (keyboardje, gewoon noten, kwintencirkel) om het geheel ook
praktisch te kunnen gebruiken.

Hier staan nog wat linkjes naar handige tutorials:

<http://clam-project.org/wiki/Network_Editor_tutorial>

<http://clam-project.org/wiki/SMSTools_tutorial>
