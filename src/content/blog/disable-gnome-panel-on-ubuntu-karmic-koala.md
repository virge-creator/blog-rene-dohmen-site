---
title: 'Disable Gnome-Panel on Ubuntu Karmic Koala'
date: '2010-02-25 21:35'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

Still customizing our new hardware for the braintrainer. Now I added
Cairo Dock to have a really fancy menu for launching our apps. It was
actually rather complicated to remove my last gnome panel, to make the
most efficient use of Cairo Dock on Ubuntu 9.10 Karmic.

This is done by running gconf-editor (either from a run dialog or from
CLI), and navigating to Desktop --\> Gnome --\> Session --\>
Required-Components. Now you will have three values in the panel on the
right. Change the value of "Panel" from "gnome-panel" to "" (blank).
Note that in order for this to work, you'll need to have another panel
application (e.g. AWN or CAIRO DOCK) running and in your startup
programs folder.

I removed 'panel' from the list, but still have the
panel-\>gnome-panel key. Logging out and logging in again was all
that's needed. No more gnome-panel, just a nice and cool cairo dock.

However, if you ever had the option "automatically remember\..." in
gnome-session-properties aka 'Startup Applications' switched on you
may have an entry referring to gnome-panel in
\~/.config/gnome-session/saved-session. Keep this option off for now,
clean out the saved-session directory and try again.Just a quick one.
Took me bloody ages to find this out, so hope this has made things
easier for some of you!
