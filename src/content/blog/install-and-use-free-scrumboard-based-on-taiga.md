---
title: 'Install Taigo, scrumboard en project planning tools on an Ubuntu box'
date: '2015-10-03 11:09'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","python","linux","git","database"]
thumbnail: '/images/thumbnails/agile.png'
status: 'published'
---

Install system deps. The official docs:
<http://taigaio.github.io/taiga-doc/dist/setup-production.html> tries to
install postgres 9.3 but I used postgres 9.4.

``` {.bash}
sudo apt-get install -y build-essential binutils-doc autoconf flex bison libjpeg-dev
sudo apt-get install -y libfreetype6-dev zlib1g-dev libzmq3-dev libgdbm-dev libncurses5-dev
sudo apt-get install -y automake libtool libffi-dev curl git tmux gettext
sudo apt-get install -y postgresql-9.3 postgresql-contrib-9.3
sudo apt-get install -y postgresql postgresql-contrib
sudo apt-get install -y postgresql-doc postgresql-server-dev
sudo apt-get install -y postgresql-doc postgresql-server-dev-9.4
sudo -u postgres createuser taiga
sudo -u postgres createdb taiga -O taiga
sudo apt-get install -y python3 python3-pip python-dev python3-dev python-pip virtualenvwrapper
sudo apt-get install libxml2-dev libxslt-dev
```

Setup easy postgres connection

``` {.bash}
sudo -u postgres createuser -s $USER
createdb $USER
```

Install backend

``` {.bash}
mkdir -p GIT
cd GIT
git clone https://github.com/taigaio/taiga-back.git taiga-back
cd taiga-back
git checkout stable
mkvirtualenv -p /usr/bin/python3.4 taiga
pip install -r requirements.txt
python manage.py migrate --noinput
python manage.py loaddata initial_user
python manage.py loaddata initial_project_templates
python manage.py loaddata initial_role
python manage.py compilemessages
python manage.py collectstatic --noinput
```
