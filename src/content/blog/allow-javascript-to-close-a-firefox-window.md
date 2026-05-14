---
title: 'Allow javascript to close a firefox window'
date: '2010-02-28 21:38'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","javascript"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

Just as a quick reminder for myself; firefox diasallows closing the
window with javascript, sometimes, e.g. on a kiosk comp, it's very
handy to have the browser closed by javascript.

1.  Type **about:config** in the address bar and press **Enter**.
2.  Find the setting **dom.allow_scripts_to_close_windows.**
3.  Double-click on the setting to set it to **true** to enable scripts
    to close the browser window via **close()**. Set it to **false** to
    prevent scripts from closing windows via **close()**.

Note: This setting is available in Firefox 3 and Firefox 2.
