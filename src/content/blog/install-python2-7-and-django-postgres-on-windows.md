---
title: 'Install python2.7 and Django + postgres on windows'
date: '2015-09-19 12:20'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","python","database"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

Installing a quite normal Django stack on windows with postgres support
yields a lot of questions on StackOverflow; especially the installation
of psycopg2 can be a bit tricky. The typical error message you will
receive is: Unable to find vcvarsall.bat. This message appears when a
Python package contains the source code for a native extension module
(.pyd), but does not have a pre-built copy of the module.

In this blog post I'll document the easiest way with Python2.7 and the
Microsoft Visual C++ Compiler for Python 2.7 which doesn't involve
installing the full Visual Studio suite. This will come in handy when
using it to build a self containing CI setup that can update to the
latest psycopg2 by compiling the C extension yourself when needed.

Step 1: Install Python2.7
=========================

I used the 64-bit MSI installer from
<https://www.python.org/downloads/release/python-2710/>. You can use the
installer to add Python to your Path or do it by hand:
C:Python27;C:Python27Scripts;

Step 2: Install virtualenv
==========================

Install virtualenv and some tools to ease the creation of virtual python
environments

``` {.bash}
cmd
pip install virtualenv
pip install virtualenvwrapper-win
mkvirtualenv test
```

Step 3: Download and install postgres
=====================================

Before you continue to install python packages inside you virtualenvs
download postgres itself. It contains files that are needed when
compiling the psycopg2 python package. Just use the last 64 bit
installer from
<http://www.enterprisedb.com/products-services-training/pgdownload#windows>
**Important:** add the postgres C:Program FilesPostgreSQL9.4bin folder
to your path. It contains the .dll needed for psycopg2.

Step 4: Install Microsoft Visual C++ Compiler for Python 2.7
============================================================

Download it from here:
<http://www.microsoft.com/en-us/download/details.aspx?id=44266> and run
the installer. You can now proceed installing other packages, assuming
no further C extensions are listed in the requirement.txt

Step 5: Install django and psycopg2
===================================

Your system should now be ready for installing psycopg2

``` {.bash}
cmd
workon test
pip install django
pip install psycopg2
```

Test it:

``` {.bash}
python

```

When you get an error like this: "ImportError: DLL load failed: %1 is
not a valid Win32-application" you probably havn't configure the
postgres bin folder in your environments path.
