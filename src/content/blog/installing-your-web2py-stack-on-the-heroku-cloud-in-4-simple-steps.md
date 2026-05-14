---
title: 'Installing your web2py Stack on the Heroku cloud in 4 simple steps'
date: '2013-01-05 22:26'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","git"]
thumbnail: '/images/thumbnails/python.jpg'
status: 'published'
---

One of the coolest things about web2py is it's ability to run on most
of the modern cloud solutions that are available on the web. It runs,
without much modifications on Heroku, Amazon cloud, Google App Engine,
Redhats OpenShift, Dotcloud and probably on some "do it yourself"
cloud solutions. So on a cloudy and rainy day I started some tests to
see what clouds would be cloudy enough for our purposes.

Here is what I did to get a testing environment on the Heroku App cloud
on my Ubuntu 12.04 LTS Workstation:

1.  Sign up and [follow the
    instuctions](https://devcenter.heroku.com/articles/quickstart)in
    Heroku Quick start manual to get a Heroku toolchain for Ubuntu
    installed. You could copy paste the next command if you feel safe
    with me ;)

``` {.bash}
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
```

2.  Get a clean web2py:

``` {.bash}
git clone https://github.com/web2py/web2py.git heroku_root
```

3.  Copy Massimo's "one script does it all" solution to the web2py
    root and run it:

``` {.bash}
cd heroku_root
cp scripts/setup-web2py-heroku.sh .
chmod +x setup-web2py-heroku.sh
./setup-web2py-heroku.sh
```

4.  That's it; Your app is deployed and Heroku opened a browser showing
    you

![web2py-welcome-heroku.png](/blog-rene-dohmen-site/images/posts/installing-your-web2py-stack-on-the-heroku-cloud-in-4-simple-steps/web2py-welcome-heroku.png)
