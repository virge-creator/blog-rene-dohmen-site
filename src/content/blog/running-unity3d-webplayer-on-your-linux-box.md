---
title: 'Running Unity3D webplayer on your linux box'
date: '2014-03-11 00:35'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

As NaCl builds are not working at all in Unity4.3 and Flash is most
likely to be removed from future Unity versions the only native way to
play Unity games on your Linux box is via a standalone game. But with
the same technique that enables watching Netflix on Ubuntu it's also
possible to install the Unity Webplayer plguin for Chrome and Firefox.

First remove previous PPA as they will no be updated anymore. You can
skip this step if you didn't install older compholio/pipelight
versions.

``` {.bash}
sudo add-apt-repository --remove ppa:mqchael/pipelight
sudo add-apt-repository --remove ppa:mqchael/pipelight
```

Now you are ready to add the new multiplugin pipelight PPA's:

``` {.bash}
sudo add-apt-repository ppa:pipelight/stable
sudo apt-get update
sudo apt-get install --install-recommends pipelight-multi
sudo pipelight-plugin --update
```

Note: you will see a dialog asking you to confirm the install of the
Microsoft core-fonts; this is a package form the Ubuntu multiverse
repository. It's enabled by default on recent Ubuntu distro's.
Instructions to enable it on older distro's can be found
[here](http://askubuntu.com/questions/89096/how-do-i-enable-the-multiverse-repository).

Go ahead and enable silverlight, this is not needed for Unity webplayer,
but watching Netflix is relaxing and it can be used to test the whole
system.

``` {.bash}
sudo pipelight-plugin --enable silverlight
```

(wait for wine to finish installing)

Now you need an Chrome extension called "User-Agent Switcher for
Chrome" so you can force the user agent to "Windows Firefox 15". You
can even spoof it on a permanent basis for the domain netflix.com.
Image: Schermafdruk-van-2014-03-11-005155.png

After that enable the Unity3d plugin:

``` {.bash}
sudo pipelight-plugin --enable unity3d
```

(wait for wine to finish installing)

Important: set you user agent to Safari5, OSX; this is the only
user-agent that worked for me!

Now try it with some games:
<http://www.kongregate.com/games/flippfly/race-the-sun>
<http://dev.formatics.nl/tictactoe>

Image: Schermafdruk-van-2014-03-11-011958.png
