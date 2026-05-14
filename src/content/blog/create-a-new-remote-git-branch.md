---
title: 'Create a new remote GIT branch'
date: '2011-07-27 16:19'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","git"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

My workflow is generally something like this:

1.  Create a remote branch
2.  Create a local branch that tracks it
3.  Work, Test, Commit (repeat) -- this is all local
4.  Push (pushes commits to the remote repository)

Because I always forget howto make a new remote branch I wrote this
small article about it:

\#\# 1. Create the remote branch

``` {.bash}
git push origin origin:refs/heads/new_feature_name
```

\#\# 2. Make sure everything is up-to-date

``` {.bash}
git fetch origin
```

\#\# 3. Then you can see that the branch is created.

``` {.bash}
git branch -r
```

This should show 'origin/new_feature_name'

\#\# 4. Start tracking the new branch

``` {.bash}
git checkout new_feature_name
```
