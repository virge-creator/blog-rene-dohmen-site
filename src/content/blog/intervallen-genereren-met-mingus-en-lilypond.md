---
title: 'Intervallen genereren met mingus en lilypond'
date: '2011-07-02 16:36'
author: 'acidjunk'
category: 'Computerz, Muziek'
tags: ["Computerz, Muziek","python","music"]
thumbnail: '/images/thumbnails/music.jpg'
status: 'published'
---

Voor een music elearning project zijn we bezig met een theorie module.
Omdat de theorie module veel standaard notenvoorbeelden zal bevatten
hebben we eerst een generator geschreven voor toonladders. Dat werkt als
volgt; je vult een toonladder in met lilypond notatie -\> geeft aan dat
ie voor alle toonsoorten gebruikt kan worden en een python script
rendert vervolgens de toonladders naar .png bestanden die gebruikt
kunnen worden in de theorie module. Tijdens het omzetten naar .ly
(lilypond bestanden) wordt er ook een midifile gemaakt die vervolgens
door timidity wordt omgezet naar .wav zodat de oefeningen niet alleen
qau notenvoorbeeld bekeken kunnen worden maar ook afgespeeld zodat je
een idee hebt hoe e.e.a. klinkt.

We hebben ook een aantal python scripts gemaakt die gebruikt kunnen
worden om een hele set intervallen te genereren voldoende aan instelbare
eisen. Hier is ondertussen ook een akkoord variant van.

De rest van het platform is geheel webbased en kan nu al helemaal
gebruikt worden voor het invoeren van algemene muziek theorie vragen en
examens. Hieronder een aantal screenshots van hoe het eruit ziet.

![Schermafbeelding-2011-07-02-om-18.04.30.png](/images/posts/intervallen-genereren-met-mingus-en-lilypond/Schermafbeelding-2011-07-02-om-18.04.30.png)

![Schermafbeelding-2011-07-02-om-18.04.48.png](/images/posts/intervallen-genereren-met-mingus-en-lilypond/Schermafbeelding-2011-07-02-om-18.04.48.png)

![Schermafbeelding-2011-07-02-om-18.05.21.png](/images/posts/intervallen-genereren-met-mingus-en-lilypond/Schermafbeelding-2011-07-02-om-18.05.21.png)

![Schermafbeelding-2011-07-02-om-18.05.47.png](/images/posts/intervallen-genereren-met-mingus-en-lilypond/Schermafbeelding-2011-07-02-om-18.05.47.png)

Notatie editor
==============

Ook hebben we een noteeditor die, geheel zonder extra plugins in de
browser, gebruikt kan worden om notenschrift in te voeren mocht de
bibliotheek met standaard materiaal hierin niet voorzien.

![Schermafbeelding-2011-07-02-om-18.08.42.png](/images/posts/intervallen-genereren-met-mingus-en-lilypond/Schermafbeelding-2011-07-02-om-18.08.42.png)
