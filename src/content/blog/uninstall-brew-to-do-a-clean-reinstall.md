---
title: 'Uninstall brew, to do a clean reinstall'
date: '2012-04-04 16:26'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","git"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

In the last year I switched from macports/fink to brew; it has a lot of
advantages. It also doesn't ruin your system because it keeps it stuff
inside /usr/local

But if you want to update a rather complex brew environment you're in
trouble. Some maintainers like the Riverwind guys only provide the last
pyqt for download making it impossible to install an older version with
homebrew. So in some cases it's best to just completly remove the
homebrew install and start over from scratch with the latest homebrew.

``` {.bash}
$ brew --prefix
```

In most cases it wil output: /usr/local

``` {.bash}
$ cd /usr/local
$ rm -rf Cellar
$ brew prune
$ rm -rf Library .git .gitignore bin/brew README.md share/man/man1/brew
$ rm -rf ~/Library/Caches/Homebrew
```

Then reinstall it with the next command, or better yet ; copy it from
the brew site again at
<https://github.com/mxcl/homebrew/wiki/installation>:

``` {.bash}
$ /usr/bin/ruby -e "$(/usr/bin/curl -fksSL https://raw.github.com/mxcl/homebrew/master/Library/Contributions/install_homebrew.rb)"
```
