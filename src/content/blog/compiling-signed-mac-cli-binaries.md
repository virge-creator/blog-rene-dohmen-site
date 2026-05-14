---
title: 'Compiling signed mac cli binaries'
date: '2021-05-15 02:15'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","git"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

Signing apple code whilst working with teh Apple development tools is painless, except when you want to sign
binary's without using xCode at all.

## Compiling the app

creating a kit:
I tried to use the interactive web build http://kitcreator.rkeene.org/fossil/home

But it errored out (I created a ticket.)

After playing around with the info in https://github.com/zdia/gorilla/issues/218:
# TODO: build the kit myself -> so it can be signed from the start
