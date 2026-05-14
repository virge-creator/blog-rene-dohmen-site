---
title: 'Quickly deploy a AWS EC2 instance with python and Ubuntu 18.04'
date: '2019-05-25 02:15'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux","ssh","ansible"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

Working with the Ubuntu 18.04 default image as of 2019 it's very easy
to spin up an instance and deploy/manage stuff on it with Ansible.

I will list some common snippets I use, to quickly have a running EC2
instance with python3, virtualenv, flask and more.

Ansible setup
=============

Contents of .hosts file:

```text
[servers]
# Add hosts here
server_host_or_ip_1
server_host_or_ip_2

[servers:vars]
# Local variables for Ansible playbooks
ansible_ssh_user=ubuntu
```

Contents of deploy.yml file:

```yaml
- hosts: servers
  become: yes
  become_method: sudo
  tasks:
  - name: update cache
    apt: name=software-properties-common state=present update_cache=yes cache_valid_time=43200
  - name: install packages
    apt: name={{item}} state=installed
    with_items:
      - mc           # Optional
      - vim          # Optional
      - tree         # Optional
      - python-pip   # Optional
      - python-dev   # Optional
      - python3-pip
      - python3-dev
      - python3-venv

- hosts: webservers
  tasks:
  - name: Configure vim for application user
    template:
      src: ".vimrc"
      dest: "/home/{{ansible_ssh_user}}/.vimrc"

- hosts: webservers
  tasks:
  - name: Configure vim for root user
    become: yes
    become_method: sudo
    template:
      src: ".vimrc"
      dest: "/root/.vimrc"
```

As noted, the python2, mv and vim stuff it optional, this is just my
personal preference on any given linux host.

Amazon setup
============

Now start an EC2 instance and use the .pem file to get access. Copy your
own *id_rsa.pub* to the ubuntu user at the EC2 instance, so you can
login without a password and you are ready to use Ansible, including the
possibility to *become root* when needed.

Add the IP or host name to your .hosts file and run.

Running the playbook
====================

Create a virtualenv and:

``` {.bash}
pip install ansible
ansible-playbook deploy.yml
```

Troubleshooting
---------------

Test connection with the host. If needed, configure the ssh agent.

```shell script
ansible servers -m ping
```

Rerun the playbook with verbosity.

```shell script
ansible-playbook deploy.yml -vvvv
```

More to come in other posts.
