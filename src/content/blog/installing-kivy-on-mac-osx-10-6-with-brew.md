---
title: 'Installing kivy on Mac OSX 10.6 with brew'
date: '2013-08-28 00:19'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","git"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

We are doing more and more cool kivy stuff so it's time to get the
designers happy and let it run from src on their workstations for easy
access to the graphics and .kv files.

Step 1: Remove previous homebrew stuff and get a new one
========================================================

Because I had an already F\#ck up OS X with brew installed python, PyQt
etc I decided to start over almost clean. I followed the instruction
from:
[here](http://superuser.com/questions/203707/how-to-uninstall-homebrew-osx-package-manager)
to remove the older installed packages, although there could be better
places; like the home brew FAQ it seems. **Please skip this if you have
a decent and recent homebrew, it will remove all installed packages**

``` {.bash}
cd `brew --prefix`
rm -rf Cellar
brew prune
rm `git ls-files`
rm -r Library/Homebrew Library/Aliases Library/Formula Library/Contributions
rm -rf .git
rm -rf ~/Library/Caches/Homebrew
```

I also reverted the PATH in my .profile back to normal (e.g.
/usr/local/bin is loaded after the other bin paths).

The reinstall or install brew with:

``` {.bash}
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
```

Step2: get a decent python
==========================

``` {.bash}
brew install python
```

I had some left overs from previous Cellar: linking failed, this is how
I solved it.

``` {.bash}
brew link --overwrite python
```

Then I changed back the paths in my \~/.profile so /usr/local/bin
preceeds the other bin paths in the PATH environment variabele:
PATH=/usr/local/bin:\$PATH

I restarted my terminal to verify that running python returns something
like this:

``` {.bash}
Python 2.7.5 (default, Aug 23 2013, 03:07:24)
[GCC 4.2.1 (Based on Apple Inc. build 5658) (LLVM build 2336.1.00)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Step 3: install kivy based on the homebrew python
=================================================

``` {.bash}
brew install mercurial
```

I had some left overs from previous Cellar: linking failed, this is how
I solved it.

``` {.bash}
brew link --overwrite mercurial
```

Install SDL and other libs needed for pygame etc:

``` {.bash}
brew install sdl sdl_image sdl_mixer sdl_ttf portmidi
```

``` {.bash}
pip install cython
pip install pil
pip install hg+http://bitbucket.org/pygame/pygame
pip install kivy
```

I tested it with the kivy examples and they run really nice. Resizing of
screen works, all examples seem to start ok. Image: Schermafbeelding-2013-08-28-om-02.17.02.png
