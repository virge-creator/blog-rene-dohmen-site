---
title: 'Ignore .DS_Store file permanently when using Git'
date: '2012-06-21 22:45'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","git"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

With a couple of little commands, you'll be able to ignore the .DS_Store
files forever from your git repositories on mac!

Create (or append) the .DS_Store to a .gitignore file in your homedir.

``` {.bash}
echo .DS_Store >> ~/.gitignore
```

The following command will add the .gitignore file to the git
configuration

``` {.bash}
git config --global core.excludesfile ~/.gitignore
```
