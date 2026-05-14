---
title: 'PHP5 op snowleopard activeren, zonder MAMP install'
date: '2010-06-24 22:00'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

De installatie van een Apache webserver met PHP in OS X is heel
gemakkelijk. Standaard staat Apache en PHP al geïnstalleerd op Apple
computers. Het enige wat je hoeft te doen is de PHP module activeren en
Apache starten. Dit kun je op de volgende manier doen. PHP5 Activeren
Open een terminal terminal venster. Het Apache configuratiebestand kan
op 2 plekken staan. Probeer de onderstaande regels uit. Een van de 2
commando's werkt.

``` {.bash}
sudo vim /etc/httpd/httpd.conf
```

of

``` {.bash}
sudo vim /etc/apache2/httpd.conf*
```

Zoek de volgende regel op

``` {.bash}
#LoadModule php5_module libexec/apache2/libphp5.so*
```

Klik op de i op het toetsenbord. Je komt nu in de modus waarin je het
bestand kunt bewerken. Haal het hekje voor de regel weg. De regel ziet
er dan zo uit.

``` {.bash}
*LoadModule php5_module libexec/apache2/libphp5.so*
```

Klik op *esc* om uit de schrijfmodus te gaan. Typ *:wq*

Het bestend wordt weggeschreven.

De PHP5 module is nu in apache geactiveerd.

Apache activeren Klik op het appeltje links boven in de hoek. Klik op
Systeemvoorkeuren\..., Delen.

Zet vervolgens een vinkje voor Webserver. De Apache webserver wordt nu
geactiveerd en kan gelijk gebruikt worden. Aan de rechterkant van het
venster zie je een link naar de website. Iedere gebruiker op de computer
heeft zijn eigen website te vinden
onder <http://localhost/~gebruikersnaam>. Er is ook een hoofd
pagina <http://localhost/>. Je persoonlijke website verwijst naar
Finder, Webpagina's. De hoofdpagina verwijst naar
/Library/WebServer/Documents/.
