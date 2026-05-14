---
title: 'Using anaconda'
date: '2021-03-09 01:44'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","python","linux"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

I used python in a variety of ways in the last 15 years. Back in the days you just
worked with a system python but nowadays you have to think about stuff like virtual env,
testing your software against multiple python versions and the ever evolving eco system
on your Mac, Windows or Linux computer.

There are also use cases for older python installs; Some of the stuff I run on Amazon serverless
still uses python 3.7. One the mac, with `Homebrew`, mac this easily gets very messy as homebrew
upgrades stuff without warning and hasn't a decent python selection system. `Mac ports` can work ok,
but if you use a lot of python in your day job I think Anaconda is really nice as it makes it
easy to manage a couple of standalone python interpreters for your projects.

Let's say you need a python3.7 env for a project: `my-project`

```bash
conda create -n my-project-py37 python=3.7
conda activate my-project-py37
```

This will create a completely stand alone python installation that is isolated from
all other python environments you could possibly have on your machine. So it's perfectly
fine to install pip package without using a virtual env.

This could be a bit of an overkill, every complete python install will use disk space. If you need python3.7
for multiple projects and you will be using a virtual env for these project you're probably totally fine with:

```bash
conda create -n py37 python=3.7
conda activate py37
```

Of course anaconda has a lot of more options as it also enables the developer to install all the tensorflow
goodies combined with lot of standalone packages for complexer python setups.

If you feel that anaconda's graphical install is too bloated for your taste you can also install only
`miniconda`; which only install the CLI tools.
