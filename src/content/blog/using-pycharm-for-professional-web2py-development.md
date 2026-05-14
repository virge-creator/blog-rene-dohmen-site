---
title: 'Using PyCharm for professional web2py development'
date: '2013-11-06 20:56'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux","git"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

Our current IDE, Eclipse with PyDEV has some nice features but feels
rather slow and clumsy. You also have to install a lot of plugins to get
a reasonably working development environment. If you also install egit
you will need a fast computer with lots of RAM. Having a good IDE will
boost productivity, especially in web2py projects were navigating
between controllers and views involves a lot of files an folders.

Image: Screenshot-from-2013-11-06-215500.png

PyCharm has a lot of cool features: - navigate from controller to view
with one click (see the little "h" in my screenshot) - autocomplete
nearly everything you type - refactor variables in controller and
automatically rename the same variables in the views - run web2py from
inside PyCharm - open multiple terminals in PyCharm - excellent Vim
support with ideaVim plugin

Read an older detailed independant review
[here](http://andrewbrookins.com/tech/one-year-later-an-epic-review-of-pycharm-2-7-from-a-vim-users-perspective/).<http://andrewbrookins.com/tech/one-year-later-an-epic-review-of-pycharm-2-7-from-a-vim-users-perspective/>

Install on Ubuntu
=================

Step 1 and 2 can be skipped if you are already using Eclipse; it also
works with openjdk; but only Sun Java is Supported by JetBrains. 1)
Download the Sun/Oracle JRE from
<http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html>
and unzip it to /opt/ 2) Make sure PyCharm can find JAVA_HOME: add this
to your /etc/profile/

``` {.bash}
#Added for pycharm so it launches from the Ubuntu Unity menu
#Note: just adding JAVA_HOME to ~/.bashrc doesn't work as expected.
export JAVA_HOME=/opt/jre1.7.0_45
export PATH=$JAVA_HOME/bin:$PATH
```

3)  Install PyCharm from:
    <http://download.jetbrains.com/python/pycharm-professional-3.0.1.tar.gz>.
    I just unzipped it to \~/Applications/
4)  Reboot to make the changes in /etc/profile permanent and available;
    other wise launching it form the Ubuntu Unity menu might not work.
