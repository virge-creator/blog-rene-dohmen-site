---
title: 'Lego Mindstorm NXT2.0 on OSX 10.6'
date: '2011-12-10 21:20'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

Just as a quick reminder for myself. The Mindstorms NXT 2.0 doesn't
work out of the box on OS X 10.6. But with a quick hack it is possible
to run it; this is how I did it: To install LEGO MINDSTORMS NXT 2.0 on
Mac OS 10.6 (Snow Leopard) 1. Copy all files from the MINDSTORMS CD to a
folder on your desktop. 2. Open that folder and look under "Parts". 3.
Locate MindstormsUnivEdu.pkg or MindstormsUnivRet.pkg. 4. Right-click
(control-click) and choose "Show Package Contents". 5. Navigate into
the Contents/Resources directory and delete the "preflight" file. 6.
Close this package and run the meta-package (LEGOMindstormsEngRet.mpkg
from the root of the copied installer folder) to install MINDSTORMS NXT
