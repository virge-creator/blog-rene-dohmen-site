---
title: 'Some handy ls and find tricks with dates'
date: '2014-09-03 18:55'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

As a quick reminder for myself; some ls and find variations to do stuff
with files and dates.

ls sort on date:

``` {.bash}
ls -t
```

ls reverse sort on date:

``` {.bash}
ls -tr
```

ls reverse sort on modifed date, show hidden files, showdetails and
print it in human readable form

``` {.bash}
ls -alhtr
```

find all files in current dirs and subdirs (e.g. recursively) that are
changed in the last 5 minutes:

``` {.bash}
find . -type f -mmin -5 -print0 | xargs -0 /bin/ls -ltr
```

Find all files on filesystem that were modified maximally 3 \* 24 hours
(3 days) ago till now:

``` {.bash}
find / -ctime 3
```
