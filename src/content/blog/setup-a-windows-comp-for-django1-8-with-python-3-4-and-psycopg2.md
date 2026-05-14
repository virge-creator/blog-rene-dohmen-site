---
title: 'Setup a windows comp for Django1.8 with Python 3.4 and Psycopg2'
date: '2015-07-09 07:59'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux"]
thumbnail: '/images/thumbnails/django.jpg'
status: 'published'
---

As a Linux user the installation of all deps is rather easy; you run a
couple of apt-get installs and some pip installs inside a virtual env
and your are good to go. On windows there are some steps you need to do
by hand. Normally I like to compile my own C extensions where possible,
but after 2 tries I gave up on that as you need to have a rather complex
setup. Python 3.5 seems to solve this by allowing you to compile C
extensions with another compiler versions then the one used to compile
the used python version itself. So for now I sticked to using some
binaries.

Step 1: Install Python3.4
=========================

I used the 64-bit MSI installer from
<https://www.python.org/downloads/release/python-343/>. You can use the
installer to add Python to your Path or do it by hand:
C:Python34;C:Python34Scripts;

Step 2: Create a virtualenv
===========================

As of Python3.3 venv is part of Python itself! So go ahead and create a
virtualenv for your django project somewhere. I personally like to have
my virtualenvs in a folder in my home dir: .virtualenvs -\>

``` {.bash}
mkdir .virtualenvs
cd .virtualenvs
python -m venv django1.8-project
```

You can now activate your virtual env by navigating to
.virtualenvs/django1.8-project/bin and run activate.bat

Step 3: Download a Psycopg2 binary
==================================

Psycopg2 is one of the difficult packages in a modern django stack. With
python27 you could compile it yourself relatively easy by using the
Microsofot Visual Studio Python Redistributable; but this is bound to
python 2.7.

Download the version you want: [latest at the moment of
writing](http://www.stickpeople.com/projects/python/win-psycopg/2.6.1/psycopg2-2.6.1.win-amd64-py3.4-pg9.4.4-release.exe)
or choose your own version:
<http://www.stickpeople.com/projects/python/win-psycopg/>

Look inside the requirements.txt for a given project if you want to know
which PSycopg version you need.

Now activate your virtualenv and install it with:

``` {.bash}
easy_install package.exe
```

You can now proceed installing other packages, assuming no further C
extensions are listed in the requirement.txt

Step 4: Install other deps
==========================

When working on another project you'll probably have and
requirements.txt. Go ahead and install the other deps. From an activated
venv:

``` {.bash}
pip install -r requirements.txt
```

If you just want an empty Django project: you can save you virtualenv.

``` {.bash}
pip install django
pip freeze > requirements.txt
```
