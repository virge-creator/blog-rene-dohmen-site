---
title: 'Configuring postgresql authentication for a linux user on a fresh Ubuntu'
date: '2012-12-06 18:04'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","database","tutorial"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

By default in Ubuntu, postgresql is configured to use 'ident sameuser'
authentication for any connections from the same machine. Check out the
excellent Postgresql documentation for more information, but essentially
this means that if your Ubuntu username is 'foo' and you add 'foo'
as a postgresql user then you can connect to the database without
requiring a password. Obviously this is not something you would do on a
server but for a workstation connecting locally to your postgres
database it isn't a problem.

``` {.bash}
sudo apt-get install postgres
```

Since the only user who can connect to a fresh install is the postgres
user, here is how to create yourself a database account (which is in
this case also a database superuser) with the same name as your login
name and then create a password for the user:

``` {.bash}
sudo -u postgres createuser --superuser $USER
sudo -u postgres psql
```

Then give the new postgres user a password with.

``` {.bash}
postgres=# \password $USER
```

You are done now. If you would try it out now on a default Ubuntu
install it would complain about missing a database with the same
username as your linux user. But a simple "psql -d postgres" would
work without any errors.

Some optional steps
===================

Client programs, by default, connect to the local host using your Ubuntu
login name and expect to find a database with that name too. So to make
things REALLY easy, use your new superuser privileges granted above to
create a database with the same name as your login name:

``` {.bash}
createdb $USER
```

Connecting to your own database to try out some SQL should now be as
easy as:

``` {.bash}
psql
```

Creating additional database is just as easy: createdb mydb
