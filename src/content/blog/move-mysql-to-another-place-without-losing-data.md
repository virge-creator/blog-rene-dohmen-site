---
title: 'Move mysql to another place without losing data'
date: '2011-03-15 15:50'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","database"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

So you need to physically move around your mysql databases, typically
because you want to put them on a another partition or hard drive, or on
some network device ? This is how you can do it.

My comp runs debian unstable, but the following should apply to any
recent Debian or Ubuntu distribution. First stop the mysql service :

``` {.bash}
root@comp:~/# /etc/init.d/mysql stop

* Stopping MySQL database server mysqld                                 [ OK ]
```

Then go to your current mysql data directory, by default in Debian /
Ubuntu it should be /var/lib/mysql. Check that your databases are there
(in this example I have 2 bases - the default 'mysql' base and a
user-created 'wpdb' base) :

``` {.bash}
root@comp:~/# cd /var/lib/mysql

root@comp:~/# ls

total 21M

-rw-rw---- 1 mysql  10M 2008-05-01 14:39 ibdata1

-rw-rw---- 1 mysql 5.0M 2008-05-01 14:39 ib_logfile0

-rw-rw---- 1 mysql 5.0M 2008-04-27 20:57 ib_logfile1

drwxr-xr-x 2 mysql 4.0K 2008-04-27 20:57 mysql

-rw------- 1 root     6 2008-04-27 20:57 mysql_upgrade_info

drwx------ 2 mysql 4.0K 2008-04-28 19:28 wpdb
```

Create a new directory for your data (in this example, the /var/www
directory which is located on another partition) and give ownership on
it to the mysql user :

``` {.bash}
root@comp:~/#  mkdir /var/www/mysql_datadir

root@comp:~/#  chown -R mysql:mysql /var/www/mysql_datadir
```

Copy your databases to the new dir and update ownership if needed. Only
move the databases dirs, don't touch the other files.

``` {.bash}
root@comp:~/#  cp -r mysql /var/www/mysql_datadir/

root@comp:~/#  cp -r wpdb /var/www/mysql_datadir/

root@comp:~/#  chown -R mysql:mysql /var/www/mysql_datadir/*
```

Then update your my.conf file to make it point to the new dir :

``` {.bash}
root@comp:~/# vim /etc/mysql/my.conf
```

Find the following statement :

``` {.bash}
datadir         = /var/lib/mysql
```

and update with the new location :

``` {.bash}
datadir         = /var/www/mysql_datadir
```

And finally restart the mysql service

``` {.bash}
root@comp:~/# /etc/init.d/mysql start

* Starting MySQL database server mysqld                                 [ OK ]
```

When restarting, mysql re-created files ibdata1, ib_logfile0, etc. in
the new data dir. If everything went OK, you can now remove the original
dir. Voilà !
