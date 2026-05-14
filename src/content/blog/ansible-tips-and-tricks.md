---
title: 'Tips and tricks with ansible'
date: '2018-03-02 03:44'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","git","nginx","ansible"]
thumbnail: '/images/thumbnails/ansible.png'
status: 'published'
---

Recently I'm playing a lot with Ansible. The goal is to deploy a large
Django stack to production with all kinds of high availability stuff.
The components in this stack: CentOS, Postgres, Nginx with uWSGI and
Django, RabbitMQ, several celery workers with supervisord. As a subgoal
it would be nice to run the complete production environment also from
inside a vagrant VM; but then with all components on a single host.

Deploying a Django stack on CentOS 6.5
======================================

A small, but complete, prototype can be found
\[here\](<https://github.com/acidjunk/ansible-centos-django-stack>).
It's based on a fork of
\[this\](<https://github.com/tcosta84/ansible-centos-django-stack>)

You can try this complete Django setup, when you already have Ansible,
VirtualBox and Vagrant installed by running:

``` {.bash}
git clone git@github.com:acidjunk/ansible-centos-django-stack.git
cd ansible-centos-django-stack
vagrant up
open "http://192.168.33.10"
```

Working on your Ansible playbooks
=================================

I use Sublime for editing. Because i'm used to PyCharms autosave I
installed the Sublime's autosave plugin for that. Sublime has excellent
YAML syntax highlighting out of the box.

Some handy commands
===================

As a quick reminder for myself I list some commands here that I used a
lot while working on the Ansible scripts.

Run commands on your cluster
----------------------------

When you have an inventory file with the group all:

``` {.bash}
ansible all -m command -a "uptime"
```

Show all ansible setup variabels inside your cluster
----------------------------------------------------

It can be quite handy to see the ansible variabeles/environment stuff on
a server or VM:

``` {.bash}
ansible all -i hosts -m setup
```

Quircks with handlers
---------------------

Keep in mind that ansible only calls the handlers upon successful
completion of the completion of the playbook. When a task fails on a
host, handlers which were previously notified will not be run on that
host. This can lead to cases where an unrelated failure can leave a host
in an unexpected state. For example, a task could update a configuration
file and notify a handler to restart some service. If a task later on in
the same play fails, the service will not be restarted despite the
configuration change. You could circumvent that by providing
[\--force-handlers]{.title-ref} on the command line. If it happened
while working on a playbook you can trigger that tasks inside the
handler clause manually by running:

``` {.bash}
ansible all -m service -a "name=nginx state=restarted"
```

Start clean
-----------

When you need to start clean again you can do this:

``` {.bash}
vagrant destroy --force
vagrant up
```

Other handy adhoc stuff
-----------------------

Install a package on CentOS hosts:

``` {.bash}
ansible all -i hosts -m yum "name=nginx state=present" -s
```

Deinstall it again:

``` {.bash}
ansible all -i hosts -m yum "name=nginx state=absent" -s
```

Add a firewalld rule, activate it now and after the next boot make it
permanent:

``` {.yaml}
- name: insert firewalld
  firewalld: port={{nginx_port}}/tcp permanent=true state=enabled immediate=yes
```
