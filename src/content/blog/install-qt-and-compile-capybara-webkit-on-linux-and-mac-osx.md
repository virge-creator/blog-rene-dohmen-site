---
title: 'Install Qt and compile Capybara webkit on Linux and mac OSX'
date: '2014-05-09 23:03'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

To automate browser style testing in Ruby you can use Qt webkit
caompatible browser with CapyBara. When you try to install it you'll
get this error when qmake isn't found:

``` {.bash}
An error occurred while installing capybara-webkit (1.1.0), and Bundler cannot
continue.
Make sure that `gem install capybara-webkit -v '1.1.0'` succeeds before
bundling.
```

To solve this you have to install Qt.

Linux:

``` {.bash}
sudo apt-get install libqtwebkit-dev
```

OSX with home brew

``` {.bash}
brew update
brew install qt
```

Install capybara:

``` {.bash}
gem install capybara-webkit -v '1.1.0'
```
