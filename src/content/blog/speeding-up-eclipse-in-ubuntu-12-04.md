---
title: 'Speeding up Eclipse in Ubuntu 12.04'
date: '2012-12-07 00:49'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

I noticed that Eclipse was getting very Slow. Even with 6Gb of mem.

``` {.bash}
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java7-installer
```

Then choose it:

``` {.bash}
sudo update-alternatives --config java
```

![Screenshot-from-2012-12-07-013717.png](/blog-rene-dohmen-site/images/posts/speeding-up-eclipse-in-ubuntu-12-04/Screenshot-from-2012-12-07-013717.png)
