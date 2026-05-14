---
title: 'Install Ruby on Rails 4.0 on Mac OSX with home-brew'
date: '2014-04-05 02:05'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/ruby.jpg'
status: 'published'
---

I recently started to do some development on some Rails4.0 based apps.
Setting up a nice and clean Rails environment can be a hassle. The
OSX/Windows instructions form railsinstalelr.org install an old version
and are not working with Maverick, other instruction install macports;
which I don't like at all. So for OSX I followed the instructions on
<http://www.createdbypete.com/articles/ruby-on-rails-development-setup-for-mac-osx/>

I assume a working brew to begin with.

Update brew
===========

``` {.bash}
brew update
```

Install Ruby with rbenv
=======================

OS X comes with Ruby installed (Mavericks even gets version 2.0.0,
previously it was only 1.8.7), as we don't want to be messing with core
files we're going to use the brilliant rbenv and ruby-build to manage
and install our Ruby versions for our development environment.

Lets get brewing! We can install both of the required packages using
Homebrew, once done we add a line to our \~/.bash_profile and reload our
terminal profile.

``` {.bash}
brew install rbenv ruby-build rbenv-gem-rehash
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
```

Now close terminal and open it again, this ensure everything has been
reloaded in your shell.

The package we just installed allow us to install different versions of
Ruby and specify which version to use on a per project basis and
globally. This is very useful to keep a consistent development
environment if you need to work in a particular Ruby version.

We're going to install the latest stable of Ruby (at the time of
writing) you can find this out by visiting the Ruby website. Or to see a
list of all available versions to install rbenv install \--list.

``` {.bash}
rbenv install 2.1.1
rbenv rehash
```

Let's set this version as the one to use globally so we can make use of
it in our terminal.

``` {.bash}
rbenv global 2.1.1
```

Install bundler
---------------

``` {.bash}
gem install bundler
```

or

``` {.bash}
brew install rbenv-default-gems
echo "bundler\n" >> "~/.rbenv/default-gems"
```

A very good tip to speed up new app creation and when you use Google to
lookup documentation -\> skip the docs:

``` {.bash}
echo 'gem: --no-document' >> ~/.gemrc
```

Install Ruby on Rails
=====================

So far you've installed Ruby, if you're not going to be working with
Rails you can pat yourself on the back and start working with Ruby! If
you intend to work with Rails then you've just got a couple more things
to do.

Install SQLite3
===============

SQLite is lightweight SQL service and handy to have installed since
Rails defaults to using it with new projects. You may find OS X already
provides an (older) version of SQLite3, but in the interests of being
thorough we'll install it anyway as Homebrew will set it to
'keg-only' and not interfere with the system version if that is the
case.

Installation is simple with Homebrew:

``` {.bash}
brew install sqlite3
```

Install Rails
=============

With Ruby installed and the minimum dependencies ready to go Rails can
be installed as a Ruby Gem.

``` {.bash}
gem install rails
```

If you would like Rails to be a default gem in the future when you
install a new version of Ruby you can add it to the default-gems file.

``` {.bash}
echo 'rails' >> ~/.rbenv/default-gems
```

Test your install
=================

Ready to put all this to good use and start your first project? Good,
we're going to create a new project called hello world.

``` {.bash}
mkdir rails_projects
cd rails_projects
rails new helloworld
cd helloworld
```

Now we're going to set the local Ruby version for this project to make
sure this stays constant, even if we change the global version later on.
This command will write automatically to .ruby-version in your project
directory. This file will automatically change the Ruby version within
this folder and warn you if you don't have it installed.

``` {.bash}
rbenv local 2.1.1
```

Note: If your gems start causing problems you can just run gem pristine
\--all to restore them to pristine condition.

Now let's test our application is working:

``` {.bash}
rails server
```

Output:

``` {.bash}
=> Booting WEBrick
=> Rails 4.0.4 application starting in development on http://0.0.0.0:3000
=> Run `rails server -h` for more startup options
=> Ctrl-C to shutdown server
[2014-04-05 04:04:33] INFO  WEBrick 1.3.1
[2014-04-05 04:04:33] INFO  ruby 2.1.1 (2014-02-24) [x86_64-darwin13.0]
[2014-04-05 04:04:33] INFO  WEBrick::HTTPServer#start: pid=28218 port=3000
```

Screenshot of the Rails hello world app
=======================================

Image: Schermafbeelding-2014-04-05-om-14.34.39.png
