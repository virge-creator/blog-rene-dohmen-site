---
title: 'Showing progress during dd copy'
date: '2010-10-11 21:31'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

dd is a popular, generic command-line tool for copying files from 1
location to another. It is often used to copy entire disk images.

Like many Linux command line tools, it operates silently unless
something unexpected happens. Its lack of visual progress feedback is a
nice feature for scripting. However, it can leave you wondering about
its progress if you are interactively dd-copying a large disk.

To illustrate, you run the following (valid, but perhaps not very
useful) dd copy:

``` {.bash}
$ dd if=/dev/random of=/dev/null bs=1K count=100
```

It will run for a few minutes as it copies (and immediately discards)
100 blocks of randomly generated data, each of size 1 KB.

To get a progress report while *dd* is running, you need to open another
virtual terminal, and then send a special USR1 signal to the *dd*
process.

First, find out the process id of the *dd* process by running the
following in the new virtual terminal.

\$ pgrep -l '\^dd\$'

``` {.bash}
8789 dd
$
```

To send the USR1 signal to the *dd* process:

\$ kill -USR1 8789

``` {.bash}
$
```

Note that as soon as the USR1 signal is detected, *dd* will print out
the current statistics to its STDERR.

On OSX this will NOT work, an easy workaround:

\$ killall -INFO dd

``` {.bash}
$ dd if=/dev/random of=/dev/null bs=1K count=100
0+14 records in
0+14 records out
204 bytes (204 B) copied, 24.92 seconds, 0.0 kB/s
```

After reporting the status, *dd* will resume copying. You can repeat the
above kill command any time you want to see the interim statistics.
Alternatively, you can use the watch command to execute kill at a set
interval.

``` {.bash}
$ watch -n 10 kill -USR1 8789
```
