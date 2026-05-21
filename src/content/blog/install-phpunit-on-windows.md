---
title: 'Install phpunit on windows'
date: '2015-02-23 13:53'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

You can use composer to install phpunit, for example, inside a Symfony2
project; but it's better to install it as a separate binary as it
allows you to run unit test on all php scripts and it integrates better
in phpStorm.

Create folder to hold php bins
==============================

I used an Applications folder in my windows home; but you can also user
C:bin or something like that. Add the folder to your Path: e.g. add
";C:bin" to your PATH environment variable. In the Advanced System
Properties, Environment variables: Image: 2015-02-23-13_35_17-Program-Manager.png

![2015-02-23-13_36_31-Program-Manager.png](/images/posts/install-phpunit-on-windows/2015-02-23-13_36_31-Program-Manager.png)

Download the .phar file
=======================

Download <https://phar.phpunit.de/phpunit.phar> and save the file as
C:binphpunit.phar

Create a .bat wrapper
=====================

Open a command line (e.g., press Windows+R » type cmd » ENTER)

``` {.bash}
cd C:\bin
echo @php "%~dp0phpunit.phar" %* > phpunit.cmd
exit
```

Verify that it worked by openening a new command line: type "phpunit"
and press enter. It should show the phpunit options.
