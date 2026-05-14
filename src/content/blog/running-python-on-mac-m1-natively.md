---
title: 'Running python on mac m1 natively'
date: '2021-11-12 15:15'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux","git","database"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

I waited quite a while before I decided to switch my python from Intel to ARM on my laptop with Apple Sillicon. To be
honest on the first generation the speed with Intel is so so. But when you switch to ARM it improves so much that it
is nearly as fast as the fastest Mac book pro of 2019. I had a couple attempt on running it natively before but there
were still a lot of packages and libraries that had problems. So I used Python, for work, on it for almost 9 months;
purely in Rosetta mode. I manage my python with Conda and some project still use older python version so a setup
that allows me to switch between intel and arm would be handy as only python 3.9 and higher are available natively.

You could probably also have success with homebrew but when you want to run multiple isolated python versions with
ease it easier to use something like anaconda. For other binaries from the unix world I tend to use mac ports these
days, but for postgres I use the [Postgres,app](https://postgresapp.com/). It has a handy GUI that can be used to start
and stop the DB server.

> To speed up stuff and to test it without fucking up your system you are probably best of with [miniforge](https://github.com/conda-forge/miniforge).

Miniforge allows you to install the conda package manager with the following features pre-configured:
- conda-forge set as the default (and only) channel.
- Packages in the base environment are obtained from the conda-forge channel.
- Optional support for PyPy in place of standard Python interpretter (aka "CPython").
- Optional support for Mamba in place of Conda.
- An emphasis on supporting various CPU architectures (x86_64, ppc64le, and aarch64 including Apple M1).

*Note*: I also use a lot of postgresql on my day to day tasks. Mostly using the `psycopg2-binary`. So I needed
to upgrade the Postgres.app to the latest version first. Please make sure you use a universal build. Older ones will
force the DB and pqlib to Intel.

# After the install

When you complete the install and start a new terminal you will have a `[base]` prefix in your prompt.

```
Last login: Fri Nov 12 18:20:46 on ttys000
(base) acidjunk@acidbook ~ % python
Python 3.9.7 | packaged by conda-forge | (default, Sep 29 2021, 19:24:02) 
[Clang 11.1.0 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

You can verify in activity viewer whether python is running in Rosetta 2 (Intel) or Apple mode:

![activity-viewer.png](/blog-rene-dohmen-site/images/posts/running-python-on-mac-m1-natively/activity-viewer.png)

Venvs that you used should be reinstalled.

> And more importantly

you should make sure that you run any fresh pip installs with `--no-cache-dir`. If you forget it, deps like the
`psycopg-2-binary` will probably use a cached intel variant of the binary during the install and that obviously
won't work.

## Speed

I did some measurements for practical stuff, like running the unit tests in the [SURF](https://surf.nl) repo's, and so
far the speeds seems doubled; compared against running it in Intel simulation mode. It wasn't slow, but slower than my
2018 iMac. Now it's just a little faster than the iMac.

I will try to add some benchmarks here, or in another article soon.

Do you have experiences with it yourself? Let me know in the commentz.
