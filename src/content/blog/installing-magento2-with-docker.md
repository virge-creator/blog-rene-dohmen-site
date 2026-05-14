---
title: 'Installing Magento2 with docker'
date: '2017-10-03 06:44'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","docker","git","ansible","tutorial","devops"]
thumbnail: '/images/thumbnails/magento.jpg'
status: 'published'
---

This is the second post in a series of post describing how to run
Magento via Docker on Mac OS.

Setting up a dockerized Magento2 is easy. Magento also provides a dev
box, but this post focuses on having a production grade Magento ready
for swarm deployment, with some scalability features so you can tweak
your production stack where needed.

The hardest part was acquiring a project to deploy. For that you need a
box running php/composer etc. I used the vagrant box from part 1 (the
one without Ansible) to create a new empty Magento2 project with:

``` {.bash}
composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition magento2
tar -czvf magento2_with_xdebug_enabled_and_sample_data.tgz magento2
```

You could of course also used the dev box docker from Magento itself and
start it with a folder mounted: so you can run the command from inside a
docker.

Note: Remember to disable xdebug when you are building for production.

Now follow the instructions from:
<https://github.com/fballiano/docker-magento2>

When the docker is started you can use the magento project folder for
it's data.

Steps:

``` {.bash}
git clone https://github.com/fballiano/docker-magento2
cd docker-magento2
tar -xzvf magento2_with_xdebug_enabled_and_sample_data.tgz
docker-compose up
```

For dev: Dev box from Magento: had to edit docker-compose magento
version 2.1.9 instead of 2.1.8 ./m2devbox-init.sh To open installed
magento go to <http://127.0.0.1:32771>, admin area:
<http://127.0.0.1:32771/admin>, login: admin, password: admin123
