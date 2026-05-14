---
title: 'Install Weasyprint on Ubuntu 12.04 64 bit'
date: '2014-09-18 08:57'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","python","linux"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

I had to tweak some stuff to get a running Weasyprint on one of our
Ubuntu servers; just following the install instructions from the docs
didn't work:

``` {.bash}
sudo apt-get install python-dev python-pip python-lxml libcairo2 libpango1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
apt-get install libxml2 libxml2-dev
apt-get install libxslt libxslt-dev
pip install WeasyPrint
pip install html5lib --upgrade
```

Make sure your env is OK: in /etc/environment: LC_ALL="en_US.utf8"
