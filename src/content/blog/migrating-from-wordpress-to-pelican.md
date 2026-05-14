---
title: 'Migrating a wordpress blog with content to a pelican based static html site'
date: '2018-12-13 03:11'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux","docker","git","tutorial"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

After the last wordpress update/configuration hickup I finally had it.
For years I had struggled to keep the damn thing running. When I started
the blog it wass all fine, but over the years it got a bit messy. It's
also quite difficult to host stuff from the default wordpress docker
from the */blog/* folder. Enabling https involved search replace in sql
files. etc.

So I decided to convert it to a static site wth good support for
showing/displaying code.

Description of the import process
=================================

Import commando's:

``` {.bash}
pelican quickstart
pelican-import --wpfile rene_dohmen_wordpress.xml --wp-attach
pelican content
pelican --listen
```

Tweaking and theming of Pelican
===============================

Example of the generated a conf file:

``` {.python}
#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'René Dohmen'
SITENAME = 'Reneekes Blog'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = 'nl'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Pelican', 'http://getpelican.com/'),
         ('Python.org', 'http://python.org/'),
         ('Jinja2', 'http://jinja.pocoo.org/'),
         ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 100
THEME = "/Users/acidjunk/GIT/pelican-semantic-ui-dark"
```

Theming
=======

I wrote my own small theme, based on regular semantic UI, but with a
dark theme.

You can get it here:
<https://github.com/acidjunk/pelican-semantic-ui-dark>

Content
=======

As expected: quite a mess in the wordpress backup. I had to fix a lot of
small issues to get most of my posts back. But pelican has a great
warning/error system so basically it boiled down to two evenings
correcting stuff to get almost 250 posts back online.

Todo
====

I still need to investigate how to keep the old URL's intact and how to
handle attachments. The media/image files are nicely copied into the
pelican tree: but I expect that I will need some sort of image pipeline
that is capable of doing some resize/crop stuff.
