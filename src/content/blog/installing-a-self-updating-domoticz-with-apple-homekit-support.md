---
title: 'Installing a self-updating Domoticz with Homekit support'
date: '2019-03-29 15:32'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","javascript","linux","docker","git","tutorial"]
thumbnail: '/images/thumbnails/domoticz.jpg'
status: 'published'
---

V1 of my domotica project was running on a Raspberry Pi 1, and it served
me well for 3 years. You could actually only notice the lack of
processing power when you toggled some bigger scenes. It took the
Raspberry Pi somewhere between 1 and 2 seconds to turn on over 10
Philips Hue bulbs.

The setup itself was very nice to work with, it could be controlled very
easy from Smart TV, Phones, Browsers and some hardware Fibaro switches.
But it lacked decent NL Siri support. This post describes how to get
things up and running with localized Siri support. By using
<https://github.com/nfarina/homebridge> you get decent Homekit support
even for devices that are not Homekit certified. Your Domoticz server
will work as bridge to devices that don't support Homekit.

**Note**: An extra, rather personal, requirement is that I don't like
to open up my house (and it's data) to the cloud and or Smart Home
device suppliers, so the domotica system is available from within the
house, when I need external access I use a VPN to reach the
Domotica/Homekit server. An exception was needed for a workable solution
with my new NetAtmo Themostat's as it always needs access to a NetAtmo
webservice.

When ready you can do things like:
==================================

``` {.bash}
"Siri, turn on the living room lights." - EN
"Siri, close all the blinds." - EN
"Siri, zet de lampen aan in de woonkamer." - NL
"Siri, doe alle rolluiken dicht." - NL
"Siri, doe rolluiken woonkamer dicht." - NL
"Siri, activeer bioscoop mode." - NL
```

Problems
========

Currently my home setup includes:

-   Around 20 Hue bulbs and one Go
-   4x Fibaro controllable blinds (Z-wave)
-   12x all purpose Fibaro switches, wall mounted (Z-wave)
-   3x Fibaro Smoke & CO2 detectors (Z-wave)
-   a couple of cheap Chinese temp probes (433Mhz)
-   a humidity detector (433Mhz)
-   a Trust z-wave kit with 3 bulbs (Z-wave)
-   12x general purpose Klik Aan/Uit outlets (433Mhz)
-   2x Klik Aan/Uit movement detectors (433Mhz)
-   2x Klik Aan/Uit Doorbell (433Mhz)
-   a DIY c.v. controller (for sale) based on old Klik Aan/Uit circuitry
    (433Mhz)
-   NetAtmo Smart CV
-   USB RFXCOM controller + USB Z-wave controller

Except for the missing Siri support: I only experienced some minor
problems in the last 3 years of running it:

-   Updating was error prone: e.g. after an update you had to debug
    stuff to get it to work again
-   Speed of switching larger scenes could be improved
-   Siri support at home was limited to only Philips/Hue devices, not
    all Domoticz scenes could be used with Siri/Homekit
-   An app is needed on iOS to easily use domoticz stuff
-   The Pi would occassionaly crash (once in 3-4 months): never really
    debugged it

Most of my problems can be solved by emulating some HomeKit stuff: that
way I can add scenes and switches for stuff living inside Domoticz.

Installing Domoticz
===================

To start it of I decided to re-install domoticz on one of the industrial
shuttle PC's I had lying around. It features a double celeron CPU and
30Gb of SSD storage. Most people will use a Raspberry Pi 3, which is a
cheaper option. As I want/like the flexibility to run other services on
the Domotica controller/computer I decided to go for a more complete
computer.

**Note**: An extra, rather personal, requirement is that I don't like
to open up my house (and it's data) to the cloud I might port it to a
docker based setup in another post so that you can run different
versions of Domoticz next to each other. The easiest way to create a
self update-able Domoticz is to run it from source and occasionally
align it with the last master branch.

I first looked at debian packages but decided to follow the running from
source aka the Hard Way as desribed on:
[Compile_Domoticz_from_source](https://www.domoticz.com/wiki/raspberry_pi_-_build_domoticz_from_source).

After completing the instruction you will have your domoticz install in
[\~/dev-domoticz]{.title-ref}

After that I installed Homekit support with the instructions on
[Homekit_Siri](https://www.domoticz.com/wiki/homekit_siri). As you need
to start some stuff which is based on Node.js when the machine boots,
they opt to use [PM2](http://pm2.keymetrics.io/) to start and manage the
processes instead of making full fledged Linux service services from it.
That's fine. PM2 suprised me: it even provides an REST FULL API to
interact with your scripts and processes so it will be easy to integrate
it in dashboard and monitoring.

Some PM2 shortcuts:

``` {.bash}
pm2 monit # start a console based monitoring program
pm2 start homebridge
```

Updating domoticz
-----------------

I'm currently running it from the development branch branch but you
even switch branches in most cases.

Updating your domoticz is easy now. You can write a crontab for it but
for I know I'm doing it manually (once a month) with:

``` {.bash}
tar -cvzf domoticz_backup.tgz dev-domoticz
cd dev-domoticz
git pull
make -j 4
```

Updating homebridge
-------------------

I'm currently running homebridge via npm package. Docs for Homevridge
itself: [Homekit_Github](https://github.com/nfarina/homebridge) and for
the plugin you can use
[homekit_Domoticz_Plugin](https://github.com/PatchworkBoy/homebridge-edomoticz).
I configured my home setup with room support to easily hide all homekit
devices and scenes that are not in the living room.

``` {.bash}
sudo npm update -g --unsafe-perm homebridge
sudo npm update -g homebridge-edomoticz
```

Tips and tricks
---------------

To enable room mode: Go to [Domoticz \> Setup \> More Options \> Plans
\> roomplan]{.title-ref}.

Add only the devices you wish to be exposed to HomeKit to this new
roomplan within Domoticz, and take a mental note of its
[roomidx]{.title-ref} number. Set "roomid" in your config.json file to
this room number.

the config file of homebridge lives in \~/.config/

Current config example:

``` {.javascript}
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:21:3E:E4:DE:33",
        "port": 36733,
        "pin": "031-45-154"
    },
    "description": "Configuration file for (e)xtended Domoticz platform.",
    "platforms": [
        {
            "platform": "eDomoticz",
            "name": "eDomoticz",
            "server": "127.0.0.1",
            "port": "8080",
            "ssl": 0,
            "roomid": 2,
            "mqtt": 1,
            "loadscenes": 1
        }
    ],
    "accessories": []
}
```

Suggestions are welcome.

Security
========

All 433 Mhz stuff is inherently unsafe, but also easy to control with
domotica gear. So watch it don't use it for critical stuff: I only use
it to monitor som temperature and to switch some lights.
