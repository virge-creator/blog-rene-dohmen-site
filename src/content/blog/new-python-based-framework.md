---
title: 'New python based framework'
date: '2011-09-13 21:51'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","python","linux","database","tutorial","devops"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

We use a lot of web interfaces and frameworks, including our own rapcms,
for the formatics stuff. The deployment is as versatile too; lots of
embedded devices have a webGUI to control stuff without a display. The
new braintrainer ships with a web interface for control panel options
and we use it in a couple of our iOS and android apps to build phonegap
webapplications with a nice toolkit. That's why we did a little bit of
research, again. We use python for a lot of other projects, and love it
for it's stablity, smart design principles and readablity of the code.
Pylons, django looked like very good and matured systems, but in the end
web2py is probably our choice.

I think it's possible to (re)build most of our existing projects with
this new python based framework. It shipps with a lot of default working
stuff, on we which already rely with our own php based CMS. I'm
building a demo app as we speak and one of the things that charms me is
the automatic table creator/migrator. When a table is defined, web2py
takes one of several possible actions:

-   if the table does not exist, the table is created;
-   if the table exists and does not correspond to the definition, the
    table is altered accordingly, and if a field has a different type,
    web2py tries to convert its contents;
-   if the table exists and corresponds to the definition, web2py does
    nothing.

This behavior is called "migration". In web2py migrations are
automatic, but can be disabled for each table by passing `migrate=False`
as the last argument of `define_table`.

It's also easy to populate a test DB with some stuff on creation of the
table. I think it's even smart enough to survive heavy SVN commits with
a lot of changes in the DB model, if used with knowledge.. (it could
also destroy an production DB in a couple of milliseconds).

Furthermore it has support for authentication in a modern way, NiCedit
(fckeditor look a like), email support with templates, localisation and
even deployment via Google app engine is possible with one click.

A already crafted an working demo with file upload and a couple of
1-to-N relations with a mysql backend. I used the tutorial from the
official web2py ebook and had things running in a couple of hours. I
didn't use the application wizard to create the new app, but just the
simple add application function in the admin gui of web2py.

All the features seem to work OK and the clever design makes it a joy to
work with, until now.

More information from a PHP perspective can be found here:
<http://web2py.com/AlterEgo/default/show/106>
