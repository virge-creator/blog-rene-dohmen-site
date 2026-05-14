---
title: 'Setup Unity3d asset server on Linux'
date: '2013-01-22 21:15'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux","git","tutorial"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

Working in a team on a Unity3d project with the Free and even the Pro
version is almost impossible. We tried several methods involving GIT and
complex .gitignore files but it's all to complicated in the dynamic
environment that we like to call work; It's very easy to screw up.

So you'll need an asset server license; Then Unity3D suddenly has a
nice version control thingie :-)

For users
=========

You can find the asset server settings via the Windows, Asset Server
option. Just make a new project and the set up your asset server
connectoion. The easiest way is to login first, then click the "Show
Projects" button. Click on the project en choose connect.

Image: asset-server1.png

For administrators
==================

I'll describe how to set up the server and the steps involved to get
the first clients in. The server package is very straight forward-\> on
linux it's a .rpm or a .deb: Install it

**RPM based OS:**

``` {.bash}
sudo rpm -Uvh http://download.unity3d.com/asset_server/unity_asset_server-2.0.1.i386.rpm
```

If this is a new installation, you will also have to supply an initial
password for the admin user:

``` {.bash}
sudo /opt/unity_asset_server/bin/reset_admin_password
```

**DEB based OS:**

``` {.bash}
wget http://download.unity3d.com/asset_server/unity-asset-server_2.0.1_i386.deb
sudo dpkg -i unity-asset-server_2.0.1_i386.deb
```

Same password instructions as above.

History
=======

Moving of scenes and assets did lead to conflicts. So a little planning
of project structure is needed. The cool thing about the version stuff
is that it integrates into the workflow. When you tried it there is no
way back.

Image: Schermafbeelding-2013-01-22-om-19.38.52-295x300.png
