---
title: 'Web2py resources'
date: '2011-10-20 20:44'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","database"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

Just some things I discovered on my learning path with the web2py
framework.

A lot of cool plugins, mostly widgets
=====================================

some table stuff, colorpicker etc:
<http://dev.s-cubism.com/web2py_plugins> <http://www.web2pyslices.com/>

Powergrid
=========

<http://labs.blouweb.com/PowerGrid/>

Complete applications
=====================

<http://web2py.com/appliances>
<http://web2py.com/appliances/default/show/31>

Wiki plugin
===========

You can use most of the widget from the wiki plugin inside the views!

rating (with stars)

``` {.bash}
{{=plugin_wiki.widget('star_rating' ,table='exercise', record_id=exercise.id)}}
```

tagging stuff

``` {.bash}
{{=plugin_wiki.widget('tags', table='None', record_id=exercise.id)}}
```

toggleable facebook style comments

``` {.bash}
{{=plugin_wiki.widget('comments' ,table='None', record_id=exercise.id)}}
```

Mobile plugin
=============

<http://web2py.com/plugins/plugin_jqmobile/about>

Populating Database with Dummy Data
===================================

For testing purposes it is convenient to be able to populate database
tables with dummy data. web2py includes a Bayesian classifier already
trained to generate dummy but readable text for this purpose. Here is
the simplest way to use it:

+-----+----------------------------------------------------------------------+
| 1\. | from gluon.contrib.populate import populate populate(db.mytable,100) |
|     |                                                                      |
| 2\. |                                                                      |
+-----+----------------------------------------------------------------------+

It will insert 100 dummy records into db.mytable. It will try to do
intelligently by generating short text for string fields, longer text
for text fields, integers, doubles, dates, datetimes, times, booleans,
etc. for the corresponding fields. It will try to respect requirements
imposed by validators. For fields containing the word "name" it will
try to generate dummy names. For reference fields it will generate valid
references. If you have two tables (A and B) where B references A, make
sure to populate A first and B second. Because population is done in a
transaction, do not attempt to populate too many records at once,
particularly if references are involved. Instead, populate 100 at the
time, commit, loop.

+-----+----------------------------------------------+
| 1\. | for i in range(10): populate(db.mytable,100) |
+-----+----------------------------------------------+
| 2\. | db.commit()                                  |
|     |                                              |
| 3\. |                                              |
+-----+----------------------------------------------+
