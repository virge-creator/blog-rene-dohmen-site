---
title: 'Usplash modding'
date: '2010-03-26 21:51'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux","tutorial"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

HOW-TO make custom usplash art

After only being able to find posts of people asking this question i
decided to explore and find out how to do it. Great thanks to garry for
his tuto at \--<http://ubuntusatanic.org/forum/comme>\...onID=21&page=1

So first things first, create an image you wont to use for usplash try
and keep the colours to a minimum

1.) Make the image 1024x768.

2.) Flatten the image so it only has one layer. \-- in GIMP do this by
{Image\--\>flatten image}.

3.) Reduce the colours by doing {Image\--\>Mode\--\>Indexed} Select
"Generate optimum palette" and set the number of colours to 256.

4.) Play around with dithering to set optimum appearance, then save as a
.png

5.) Repeat this for sizes \-- 800x600, 1365x768, 640x480 & 640x400

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--section 2
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

-   Install some build utilities

1.)

Code:

sudo apt-get install cdbs debhelper dpkg-dev fakeroot devscripts
autotools-dev

-   Install the build dependencies for the usplash stuff

2.)

Code:

sudo apt-get build-dep usplash-theme-ubuntu

-   Get the source code - I'd base it on the xubuntu usplash.

3.)

Code:

cd && apt-get source xubuntu-artwork-usplash

-   Make sure you have permission to overwrite everything

4.)

Code:

user=\$(whoami) ; sudo chmod -R 777 /home/\$user/xubuntu-artwork-0.19\*

-   Build the package

5.)

Code:

user=\$(whoami) ; cd /home/\$user/xubuntu-artwork-0.19/ &&
dpkg-buildpackage -rfakeroot

Installation. The compilation process generates a .so file. Copy it to
/usr/lib/usplash. To install it, run

6.)

Code:

sudo update-alternatives \--install /usr/lib/usplash/usplash-artwork.so
usplash-artwork.so /usr/lib/usplash/usplash-theme-xubuntu.so 10

-   Finally

7.)

Code:

sudo update-alternatives \--config usplash-artwork.so && sudo
update-initramfs -u

-   Test it with

8.)

Code:

sudo usplash -c
