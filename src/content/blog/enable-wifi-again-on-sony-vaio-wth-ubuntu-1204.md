---
title: 'Enable WIFI again on Sony Vaio with Ubuntu 12.04'
date: '2013-02-01 20:56'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

After installing 12.04 on my vaio laptop everything was OK. But when I
disabled the WIFI from the Ubuntu menu the wifi showed an message that
it was turned off with the hardware switch.

Image: Schermafdruk-van-2013-02-01-214524.png

Image: Schermafdruk-van-2013-02-01-214057.png

**The weird thing:** there is no hardware switch to turn off WIFI,
neither does the BIOS have options for disabling the WIFI.

Doing a "rfkill list all":

``` {.bash}
0: sony-wifi: Wireless LAN
Soft blocked: yes
Hard blocked: no
1: sony-bluetooth: Bluetooth
Soft blocked: no
Hard blocked: no
2: phy0: Wireless LAN
Soft blocked: yes
Hard blocked: yes
3: hci0: Bluetooth
Soft blocked: no
Hard blocked: no
```

After some searching I found a solution:

``` {.bash}
rfkill unblock wifi
```

Now your WIFI should work again.
