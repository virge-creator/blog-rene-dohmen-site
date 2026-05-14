---
title: 'Enable syntax coloring on Jenkins with vim'
date: '2018-01-24 13:20'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","git","devops"]
thumbnail: '/images/thumbnails/vim.png'
status: 'published'
---

When i'm offered the choice I will use Gitlab + Gitlab CI as it
integrates everything that's needed for a modern continuous deployment
setup. But sometimes you are force to use Jenkins because it's already
available. It uses a java subset, called Grovy to facilitate building
jobs. None of the normal IDE's environments or texteditors supported
the syntax: which makes it difficult to edit especially when you want to
run complexer shell command due to the horrible escaping rules.

First install pathogen, which makes it easy to use plugins.

``` {.bash}
mkdir -p ~/.vim/autoload ~/.vim/bundle && \
curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim
```

To use it it needs one extra line in your .vimrc vim \~/.vimrc

``` {.bash}
"***pathogen stuff***"
execute pathogen#infect()
```

Then install the plugin

``` {.bash}
cd ~/.vim/bundle/
git clone git@github.com:martinda/Jenkinsfile-vim-syntax.git
```
