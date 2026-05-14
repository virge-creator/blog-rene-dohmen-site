---
title: 'Install Magento2 on Mac OS with vagrant'
date: '2017-07-15 12:55'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript","linux","docker","git","nginx","ansible","database"]
thumbnail: '/images/thumbnails/magento.jpg'
status: 'published'
---

As Magento2 is one of the most used ecommerce solutions, on this planet,
there are a lot of ways to run it. A modern, full blown, production
ready, Magento stack will probably consists out of:

varnish, redis, nginx, php7-fpm, php7-cli, mysql and magento2 community
edition (ce) or magento2 enterprise edition (ee). For development
purposes you can remove some of the components as you probably don't
want a lot of caching; except when you want to test that kind of stuff.
A normal enterprise environment would do that kind of tests in their
acceptance anyway.

If you are developing on Mac OS; you will roughly have three options: 1)
Run Magento inside a linux VM (or use vagrant)

2)  Dockerize it and use docker on the mac
3)  Install it locally

This blog post will focus on the first option: using Magento with
Vagrant. The big advantage is that the resulting vagrant box will
probably closely mimc an actual one server setup of magento; including
varnish and redis if desired. You will need a couple of requisites: A
Magento merchant account and a github account. So, let's go.

There are rougly 2 ways to accomodate a nice Vagrant setup, with and
without Ansible. To keep complexity low this post only handles a setup
without using Ansible to provision the vagrant box.

Without Ansible
===============

Most of the stuff you'll need is described in the README of the
excellent
[magento2-vagrant-for-developers](https://github.com/paliarush/magento2-vagrant-for-developers)
github project. Follow the installation instruction to get a Vagrant box
with php7 and magento 2.2 dev.

You can just follow the instructions. You'll need a Magento Marketplace
account and a personal Github token to install packages via Composer. In
fact this is optional but if you are going to use the Magento for
development purposes you'll probably want to install packages from the
Magento Marketplace.

Creating a Magento Marketplace account
--------------------------------------

Create an account
[here](https://account.magento.com/applications/customer/create/) then
navigate to: My account =\> Marketplace =\> My Access Keys =\> Magento2
=\> Create A New Access Key.

Now you can copy/paste the public key to auth.json as the
repo.magento.com username and the private key to password.

Setup a personal github token
-----------------------------

Composer will use the github API for certain operations. To ensure a
problem free setup, you can generate a token that composer will use to
authenticate yourself with your github credentials.

Login in to your github account and navigate to:
<https://github.com/settings/profile> =\> Personal access tokens =\>
Generate new token

<!-- Image not found: http://www.renedohmen.nl/blog/wp-content/uploads/2017/03/Screen-Shot-2017-03-24-at-21.55.57.png -->

After submitting the form you can copy/paste the token as the github.com
key in auth.json

The complete auth.json will look like this:

``` {.bash}
{
  "github-oauth": {
    "github.com": "YOU_GENERATED_GITHUB_TOKEN"
  },
  "http-basic": {
    "repo.magento.com": {
      "username": "MAGENTO_PUBLIC_KEY",
      "password": "MAGENTO_PRIVATE_KEY"
    }
  }
}
```

Install magento
---------------

``` {.bash}
bash init_project.sh
```

Watch the output as it will generate a random hostname suffix which you
will need to access your store:

Access storefront at <http://magento2.vagrant> Access admin panel at
<http://magento2.vagrant/admin/> Magento admin user/password:
admin/123123q Rabbit MQ control panel: <http://magento2.vagrant:15672>,
credentials guest/guest

It will ask for a password once; this is the password of your user on
Mac OS.

You can now also fire up PHPStorm and point it to your vagrant-magento
folder + configure a remote PHP interpreter. Please make sure to read
the docs on
<https://github.com/paliarush/magento2-vagrant-for-developers>

Install with Ansible
====================

Another way of getting a Magento2 up and running in Vagrant uses vagrant
to spin up a Linux VM, then it installs Ansible on the VM and uses it to
execute an Ansible playbook, via localhost, to install a Magento
environment.

You can find the github repo here:
<https://github.com/cedricblondeau/magento2-ansible-vagrant>

It will install a mostly similar stack:

PHP7 + Nginx + Redis (sessions, full page cache, frontend cache),
MariaDB 10.0 + Magento2

The nice thing about this setup is the fact that you could quite easily
use it to deploy, and re-deploy, an simple Magento2 shop to a Digital
Ocean VM with Ansible.

Configuration
-------------

Configuration is done by setting values in an Ansible variabels file.
You'll need a Magento Market store account. Make sure that you use an
admin password of at least 7 characters.

``` {.bash}
magento_account_public_key: MAGENTO_PUBLIC_KEY
magento_account_private_key: MAGENTO_PRIVATE_KEY
mysql_user: magento2
mysql_password: magento2
mysql_dbname: magento2
magento2_language: en_US
magento2_currency: USD
magento2_admin_user: admin
magento2_admin_password: admin12345
magento2_admin_email: admin@example.com
magento2_admin_firstname: Ad
magento2_admin_lastname: Min
magento2_crypt_key: YOUR_CRYPT_KEY
magento2_base_url: http://192.168.6.6
```

Installation
------------

``` {.bash}
vagrant up
```

Now access your store at <http://192.168.6.6>
