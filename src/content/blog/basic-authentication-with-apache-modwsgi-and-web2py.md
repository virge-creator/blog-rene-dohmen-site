---
title: 'Basic authentication with apache modwsgi and web2py'
date: '2012-08-06 00:30'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

I spent over an hour trying to figure out why I wasn't able

to do basic authentication in a web2py service before I ran across a
prior post that described this essential step.

If you're using Apache with mod_wsgi and you want to use basic

authentication with a web2py service, don't forget to add the line

"WSGIPassAuthorization On" to wsgi.conf under /etc/apache2/mods-

enabled.

Or in your vhost settings:

> ServerName www.mainserver.com
>
> ServerAlias super.alias.nl mainserver.com
>
> WSGIDaemonProcess mainserver user=appuser group=appuser \\
>
> display-name=%{GROUP}
>
> WSGIProcessGroup mainserver
>
> WSGIScriptAlias / /webapps/mainserver/wsgihandler.py
>
> WSGIPassAuthorization On
