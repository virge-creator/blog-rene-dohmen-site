---
title: 'Snel een nested git repository opschonen'
date: '2011-06-23 21:15'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","git"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

Als je snel in een hoop mappen en sub mappen alle git informatie wil
opschonen, kun je dit doen:

```bash
find . -name '.git' -type d | xargs rm -rf
find . -name '.gitignore' | xargs rm -rf
find . -name '.gitmodules' | xargs rm -rf
```
