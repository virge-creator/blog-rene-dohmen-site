---
title: 'Ruby on Rails DB cheat sheet'
date: '2014-06-25 19:45'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz"]
thumbnail: '/images/thumbnails/ruby.jpg'
status: 'published'
---

As I started to do some development in Ruby here is a quick cheat sheet
with some handy DB stuff.

One of the things that annoys most RoR users is that depending on how
many Ruby environments you have on your comp you sometime can run 'rake
db:migrate' but if you have multiple ruby's you need to prefix that
with bundle exec; e.g. bundle exec rake db:migrate. To be on the save
side I prepend it in all the following examples.

After a migration:
==================

Migrate your DB to the last version as indicated in the src.

``` {.bash}
bundle exec rake db:migrate
```

On heroku:

``` {.bash}
heroku run rake db:migrate
```

When one wants to repopulate DB and make the test environment ready:
====================================================================

``` {.bash}
bundle exec rake db:reset
bundle exec rake db:populate
bundle exec rake test:prepare
```

Tips
====

You can stack items:

``` {.bash}
rake db:drop db:create db:migrate db:populate test:prepare
```
