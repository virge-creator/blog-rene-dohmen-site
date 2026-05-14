---
title: 'Using multiple Heroku accounts'
date: '2014-09-25 18:27'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","git"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

It's quite easy to use multiple Heroku accounts. install the Heroku
plugins from: <git://github.com/ddollar/heroku-accounts.git>

Then configure your accounts:

``` {.bash}
heroku accounts:add [account_name] --auto
```

Go to your project folder and choose your Heroku account: heroku
accounts:set \[account_name\]

Add your project to heroku:

``` {.bash}
heroku git:remote --app [app_name]
```

If your app doesn't exist yet:

``` {.bash}
heroku accounts:set [account_name]
heroku apps:create [app_name]
```

To push, tricky but useful for staging and tests, another branch to
Heroku:

``` {.bash}
git push heroku develop:master
```

will push current develop branch to heroku
