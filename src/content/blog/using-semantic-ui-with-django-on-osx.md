---
title: 'Using Semantic UI with Django on OSX'
date: '2015-05-21 11:07'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","javascript","git"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

I lately started working on some Django projects. The project started
from scratch so my first choice was using bootstrap3 which has excellent
Django integration. As there was a possibility that the project would be
used for multiple projects we could use a fancy LESS or SASS based
buildchain. A colleague pointed me to
[Semantic-UI](http://semantic-ui.com/) and after some initial scepsis we
tried to rewrite the existing bootstrap3 base template to semantic to
see if it works.

Reinstall NPM and Node the correct way: Run the following commands to
remove all existing global npm modules, uninstall node & npm, re-install
node with the right defaults, install npm as its own pacakge, and
configure the location for global npm modules to be installed. When
using this way you easily install npm packages globally without needing
root access and screwing up al kinds of other files on your mac.

``` {.bash}
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /usr/local/include/node_modules
sudo rm -rf ~/.npm
brew uninstall node
brew install node --without-npm
echo prefix=~/.node >> ~/.npmrc
curl -L https://www.npmjs.org/install.sh | sh
```

Add this to \~/.bash_profile:

``` {.bash}
export PATH="$HOME/.node/bin:$PATH"
```

Make sure you execute your new bash settings, e.g. do a:

source \~/.bash_profile

*Some info about this way of setting up node with npm was borrowed
from:* <https://gist.github.com/DanHerbert/9520689>

Then install gulp

npm install -g gulp

Install Semantic UI:

GIT version: git clone <git@github.com>:Semantic-Org/Semantic-UI.git cd
Semantic-UI npm install

or

NPM version (easier with updates) npm install semantic-ui \--save gulp
build

Now it's time to have some fun; browse the examples: cd examples open
homepage.html

Or, use a custom theme

gulp watch

<http://learnsemantic.com/developing/customizing.html>
