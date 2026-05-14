---
title: 'Ubuntu landscape??'
date: '2012-05-05 19:50'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","linux","git","nginx","database","music"]
thumbnail: '/images/thumbnails/ubuntu.jpg'
status: 'published'
---

I did have a look at the specs of Canonical's Landscape. If you want to
manage a bunch of (different) Linux systems with one unified interface
you can't work around it . It works with profiles and tags. Systems
matching the tag in the profile can be automatically updated.

![C3.2.2_03_manageinfo_medium.png](/blog-rene-dohmen-site/images/posts/ubuntu-landscape/C3.2.2_03_manageinfo_medium.png)

More interesting features:

-   Manage many machines at once. All operations in Landscape can be
    applied to one or more machines with the same ease.
-   Group machines to match your needs. You can split machines into
    multiple groups for different requirements while still administering
    through a single interface.
-   Manage packages across the network. View a package inventory for
    each computer and use Landscape to install, upgrade or remove
    packages from one or more computers.
-   Integrate custom software repositories. If you maintain your own
    repository, even internally, Landscape can report on and use the
    packages in it.
-   The ability to run custom scripts on command across multiple
    computers.
-   Manage users easily. Users from one or more systems are easy to
    manage with Landscape.
-   Handle security updates efficiently. Landscape highlights those
    package upgrades with security fixes (with links to detailed
    information) ensuring any vulnerabilities are dealt with as quickly
    as possible.
-   Support disconnected systems. Systems that are disconnected from the
    network will be properly handled when they next get online.

It can also be used for system monitoring. Landscape monitors systems
through an agent installed on each machine. The agent communicates with
Landscape to provide live status information. Data is securely collected
and stored in the Landscape database. Administrators can use the data
for performance analysis. Landscape's graphical module makes it easy to
plot trends of temperature, disk and memory usage, system load or custom
metrics.

<http://www.youtube.com/watch?feature=player_embedded&v=hQUz56SNzSY>

It would be the perfect office OS when used with Ubuntu One. Ubuntu's
the personal cloud service that syncs your digital life Music,
bookmarks, contacts, files between your laptop, netbook and work
desktop.

Let's try it
=============

Registering a computer
----------------------

Landscape lets you manage Ubuntu systems securely from any web browser.
The machines you want to manage need to first be registered with
Landscape. Depending on which version of Ubuntu the machine you want to
register is running, the registration procedure varies slightly. Please
follow the appropriate instructions below.

Registering a computer was very easy, it just involved running two
commands client side, plugging in my credentials and letting Landscape
do the rest:

``` {.bash}
sudo apt-get install landscape-client
sudo landscape-config --computer-title "My Web Server" --account-name youraccountname
```

Of course, this will only work if you have a Landscape account.

Accept the computer
-------------------

Now that the machine is registered as a pending computer it can be
accepted into your account. Log into landscape with your user account
information and click on the [Pending
Computers](https://landscape.canonical.com/account/qiosq/pending-computers)
link. Accept the pending thingie. Then you will see the machine you just
registered, as illustrated in this screen shot:

![Schermafbeelding-2012-05-05-om-21.35.17.png](/blog-rene-dohmen-site/images/posts/ubuntu-landscape/Schermafbeelding-2012-05-05-om-21.35.17.png)

![Schermafbeelding-2012-05-05-om-21.35.45.png](/blog-rene-dohmen-site/images/posts/ubuntu-landscape/Schermafbeelding-2012-05-05-om-21.35.45.png)

Installing packages is easy:

![Schermafbeelding-2012-05-05-om-21.24.51.png](/blog-rene-dohmen-site/images/posts/ubuntu-landscape/Schermafbeelding-2012-05-05-om-21.24.51.png)

With scripts enabled you can even run custom scripts from the webGUI:

![Schermafbeelding-2012-05-05-om-21.20.46.png](/blog-rene-dohmen-site/images/posts/ubuntu-landscape/Schermafbeelding-2012-05-05-om-21.20.46.png)
