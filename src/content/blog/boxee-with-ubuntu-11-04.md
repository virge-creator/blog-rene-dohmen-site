---
title: 'Boxee with Ubuntu 11.04'
date: '2011-07-08 22:46'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

The Ubuntu package for the current version of Boxee as of this writing,
0.9.22.13692M, does not install on the latest version of Ubuntu. It
throws an error "Dependency is not satisfiable: libxmlrpc-c3" The
problem arises because libxmlrpc-c3 has been renamed to
libxmlprc-c3-0. The solution is to modify the debian package and change
its dependencies. This is easier than it sounds, but you have to know
how. Download the debian installer from the Boxee website, and place it
in your home directory and then open up a terminal.

``` {.bash}
dpkg-deb -x boxee-0.9.22.13692.i486.modfied.deb boxee
dpkg-deb --control boxee-0.9.22.13692.i486.modfied.deb
cp -r DEBIAN boxee/
```

Now we need to edit the file that lists the dependencies. Run the first
command to do it with a GUI, or the second to use vim.

``` {.bash}
gedit boxee/DEBIAN/control
```

OR

``` {.bash}
vim boxee/DEBIAN/control
```

Find libxmlrpc-c3 in this file and append "-0" to the end of it and
save the file. Now we need to repackage our changes into a new debian
package file.

``` {.bash}
dpkg -b boxee boxee-works.deb
```

When it is done simply double-click the newly created boxee-works.deb
file and install it with Software Center.

[Image: http://www.renedohmen.nl/blog/wp-content/uploads/2011/07/Schermafdruk-Ubuntu-softwarecentrum.png

Enjoy boxee on Ubuntu!
