---
title: 'As a reminder for myself, the command line options of mc2xml'
date: '2012-01-28 19:54'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

mc2xml is a small and fast standalone command line program for
Windows/Linux/OSX that downloads media center, titantv, or schedules
direct tv listings and outputs an XMLTV formatted (xmltv.dtd) .xml file.
mc2xml options (case sensitive): -a append " \*" to new programs -A
append " \*" to live programs -F output channel "name" first (rather
than "number name") -L include tag (not part of xmltv.dtd) -u output
date/time in UTC (default = localtime) -U output UTF-8 (default =
"ISO-8859-1") -f force re-download (use with caution) -d \<\#\> set
listings duration (in hours) -s \<\[+/-\]\#\> set listings relative
start position (in hours) -c
`set country code   -g         set postal/zip code   -w      wait for  and exit   -t               use titantv service   -y           set 30 char id for titantv service   -T :  use schedules direct service   -i <#>           add <#> to all channel numbers   -I   include  in output   -R     set ren filename (default = "mc2xml.ren")   -D     set dat filename (default = "mc2xml.dat")   -C     set channel file (default = "mc2xml.chl")   -o     set output file  (default = "xmltv.xml")`

mc2xml quickstart: (see also: FAQ: nextpvr, mythtv, mediaportal, \...)

Windows:

Run "mc2xml", it has a simple graphical user interface Input postal
code and country code and press OK Select lineup number from the
returned list and an xmltv.xml file will be produced

Other OSs and command line usage:

Run mc2xml with both the -c and -g parameters to set your location

-t is optional, and only works for US zipcodes -T is optional, and
requires an account user:pass (-c & -g are not needed) -U is required
for languages that contain non ISO-8859-1 characters

Select lineup number from the returned list and an xmltv.xml file will
be produced

mc2xml setup examples:

US: mc2xml -c us -g 20006 US: mc2xml -c us -g 20006 -t -y CA: mc2xml -c
ca -g M1N2K3

AT: mc2xml -c at -g 1000 BE: mc2xml -c be -g 1000 BR: mc2xml -c br -g
20010-020 CH: mc2xml -c ch -g 1000 CZ: mc2xml -c cz -g "100 10" DE:
mc2xml -c de -g 10000 DK: mc2xml -c dk -g 1000 ES: mc2xml -c es -g 28000
FI: mc2xml -c fi -g 10000 FR: mc2xml -c fr -g 10000 IE: mc2xml -c ie -g
0 IL: mc2xml -c il -g 10000 -U IN: mc2xml -c in -g 110000 IT: mc2xml -c
it -g 00100 JP: mc2xml -c jp -g 1028000 -U KR: mc2xml -c kr -g 100 -U
MX: mc2xml -c mx -g 22440 NL: mc2xml -c nl -g 1000 NO: mc2xml -c no -g
1000 PL: mc2xml -c pl -g 11-111 PT: mc2xml -c pt -g 1000 RU: mc2xml -c
ru -g 101000 -U SE: mc2xml -c se -g "100 10" SK: mc2xml -c sk -g "100
10" TR: mc2xml -c tr -g 01000 -U TW: mc2xml -c tw -g 10000 -U UK:
mc2xml -c gb -g "SW1X 7LA"
