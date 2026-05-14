---
title: 'N7 netwerk tuner bekijken via Boxee'
date: '2011-07-07 17:31'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","git"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

We zijn bezig aan een app voor het [boxee](http://www.boxee.tv/)
platform zodat je ook TV kan kijken via de netwerktuner [N7 van
Anysee](http://www.anysee.com/eng/product/anyseeN7TC.php). Standaard
ondersteunt Boxee (zover ik kan zien) geen .m3u bestanden. Nadat ik de
tuner geconfigureerd had en de playlist had opgeslagen speelde de tuner
direct al via bijvobeeld VLC perfect TV af. Kwaliteit is goed te
 noemen, maar ik alleen nog met digitenne getest.

Omdat ik nergens in boxee de mogelijkheid zag om zelf een losse stream
door te geven ben ik maar eens wat gaan zoeken in Google. Bijna alle
apps gebruiken een rss bestand voor het aangeven van medialocaties en
metabeschrijvingen hiervan.

Na zelf m.b.v. de Boxee RSS specs een RSS bestand gemaakt te hebben met
een paar van de teststreams van de N7 was ik klaar om testen. Ik heb de
app My RSS Reader gebruikt om het snel even te testen. Helaas moet je
dan wel je RSS bestand op een webserver zetten die via internet te
bereiken is. Lokaal wou die het niet laden. Na wat gespit in de logfiles
was dit snel duidelijk.

Gebruikte test stream: (werkt alleen als je N7 streamer via
192.168.5.128 te bereiken is.) <http://www.formatics.nl/test.rss>

Image: Schermafbeelding-2011-07-07-om-18.56.37.png

Image: Schermafbeelding-2011-07-07-om-18.56.58.png

Image: Schermafbeelding-2011-07-07-om-18.57.25.png

Image: Schermafbeelding-2011-07-07-om-19.11.16.png

Om het geheel wat simpeler op een andere plek te kunnen gebruiken kun je
ook dit gebruiken:

<http://tv.formatics.nl/njoy.php?host=192.168.5.128>

Bovenstaande link kun je natuurlijk alleen gebruiken als de N7 in je
netwerk te vinden is onder 192.168.5.128

Ik heb de TV stations nu met de hand toegevoegd; weet niet of het nog
uitmaakt of je digitenne hebt of iets anders. En nu staat er alleen nog
maar NL1-3

Mocht iemand deze link gaan gebruiken en uitbreidingen weten; let me
know.
