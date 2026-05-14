---
title: 'Lost MySQL root pass?'
date: '2010-11-12 22:07'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux","database"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

Log on to your Linux machine as the root user. The steps involved in
resetting the MySQL root password are to stop the MySQL server, restart
it without the permissions active so you can log into MySQL as root
without a password, set a new password, and then restart it normally.
Here's how you do it. First, stop the MySQL server:

\# /etc/init.d/mysql stop

Now start the MySQL server using the \--skip-grant-tables option, which
will run the server without loading the permissions settings:

\# mysqld_safe \--skip-grant-tables &

The & option at the end makes the command you have executed run as a
background process. Now log on to your MySQL server as root:

\# mysql -u root

It should allow you in without prompting for a password. The following
steps will set the new password:

``` {.bash}
mysql> use mysql;
mysql> update user set password=PASSWORD(”NewMySQLPassword”) where User=’root’;
mysql> flush privileges;
mysql> quit
```

Replace "NewMySQLPassword" with your own password. Here's what happens
here. The first line selects the MySQL configuration tables. The second
line updates the value of the field "Password" for the user "root" to
"NewMySQLPassword". The third line flushes the old set of privileges and
makes sure your new password is used everywhere. Now, the last step is
to restart the server normally and use your new root password to log in:

``` {.bash}
# /etc/init.d/mysql stop
# /etc/init.d/mysql start
# mysql -u root -pNewMySQLPassword
```

Congratulations, your new MySQL root password is set and your MySQL
server is ready to be used again. Remember to update all your
applications to use this password if you are using it anywhere.
