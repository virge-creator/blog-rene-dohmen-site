---
title: 'Tips and quirks with ansible'
date: '2016-02-11 16:04'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","nginx","ansible"]
thumbnail: '/images/thumbnails/ansible.png'
status: 'published'
---

Recently I'm playing a lot with Ansible.

Some handy commands

``` {.bash}
ansible all -m command -a "uptime"
ansible all -i hosts -m setup
```

Install nginx

``` {.bash}
ansible all -i hosts -m yum "name=nginx state=present" -s
```

Deinstall it again

``` {.bash}
ansible all -i hosts -m yum "name=nginx state=absent" -s
```
