---
title: 'Install virtualenv on OSX'
date: '2015-06-02 08:14'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","git"]
thumbnail: '/images/thumbnails/ruby.jpg'
status: 'published'
---

Choose whether you want OSX python or home brew version. When you choose
home brew run:

``` {.bash}
brew install python
```

Then install virtualenv:

``` {.bash}
pip install virtualenv
pip install virtualenvwrapper
mkdir -p .virtualenvs
```

Add some conf stuff to your .bash_profile or .bash_rc

``` {.bash}
### Virtual envs
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/GIT
source /usr/local/bin/virtualenvwrapper.sh
```
