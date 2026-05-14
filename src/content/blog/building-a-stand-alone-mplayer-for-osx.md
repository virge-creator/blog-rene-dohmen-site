---
title: 'Building a stand alone Mplayer for OSX'
date: '2012-05-20 00:50'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/video.jpg'
status: 'published'
---

I needed a recent mplayer for OS X; the current homebrew version has a
memory leak when playing MPEG2 TS SD channels. This is how I compiled
the svn HEAD trunk of mplayer for OSX 10.7 and the steps needed to get
an app that you can deploy on other macs. I used a virgin OSX with only
xCode installed running in VMWare Fusion to eliminate all sort of
problems that could arise with already installed libs.

``` {.bash}
#Override default tools with Cellar ones if available
#This makes sure homebrew stuff is used
export PATH=/usr/local/bin:$PATH
#Enable extra room in my own libs
export LDFLAGS="-headerpad_max_install_names"
```

I cheated a little bit and didn't install all deps by hand. So I
installed homebrew and installed the SVN version of mplayer with:

``` {.bash}
$ brew install --HEAD mplayer
```

Maybe I had some luck; but this worked beautifully and left me with the
latest mplayer (1 March 2012). It also builded all the necessary deps.
From here on there are 2 options; use the compiled homebrew version or
build your own version with a fresh mplayer checkout. I like to have
some control about the build proces so I downloaded the mplayer from
SVN. With the previous steps it's now very straight forward to get a
working mplayer;

``` {.bash}
$ svn checkout svn://svn.mplayerhq.hu/mplayer/trunk mplayer
$ cd mplayer
$ ./configure --disable-x11 --disable-gl --disable-mencoder --enable-macosx-bundle --enable-macosx-finder --target=x86_64-Darwin [--disable-fontconfig]
$ make
```

Then I used the instructions and scripts provided by Hermi from
<http://tracker.mplayerosx.ch/boards/1/topics/1444> to change the dylibs
to work from inside the mplayer lib/
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--

``` {.bash}
mkdir mplayer_dist
cp mplayer mplayer_dist/
cd mplayer_dist
mkdir lib
cp /usr/local/lib/libfribidi.0.dylib lib/
cp /usr/local/lib/libass.4.dylib lib/
cp /usr/local/lib/libtheora.0.dylib lib/
cp /usr/local/lib/libogg.0.dylib lib/
cp /usr/local/lib/libbs2b.0.0.0.dylib lib/
cp /usr/local/lib/libSDL-1.2.0.dylib lib/
cp /usr/local/lib/libfaac.0.0.0.dylib lib/
cp /usr/local/lib/libmp3lame.0.0.0.dylib lib/
```

install_name_tool -change /usr/local/lib/libfribidi.0.dylib
\@executable_path/lib/libfribidi.0.dylib mplayer install_name_tool
-change /usr/local/lib/libass.4.dylib
\@executable_path/lib/libass.4.dylib mplayer install_name_tool -change
/usr/local/lib/libtheora.0.dylib \@executable_path/lib/libtheora.0.dylib
mplayer install_name_tool -change /usr/local/lib/libogg.0.dylib
\@executable_path/lib/libogg.0.dylib mplayer install_name_tool -change
/usr/local/lib/libbs2b.0.0.0.dylib
\@executable_path/lib/libbs2b.0.0.0.dylib mplayer install_name_tool
-change /usr/local/lib/libSDL-1.2.0.dylib
\@executable_path/lib/libSDL-1.2.0.dylib mplayer install_name_tool
-change /usr/local/lib/libfaac.0.0.0.dylib
\@executable_path/lib/libfaac.0.0.0.dylib mplayer

\#LIBS sudo install_name_tool -change /usr/local/lib/libfribidi.0.dylib
\@executable_path/lib/libfribidi.0.dylib libass.4.dylib sudo
install_name_tool -change /usr/local/lib/libogg.0.dylib
\@executable_path/lib/libogg.0.dylib libtheora.0.dylib
