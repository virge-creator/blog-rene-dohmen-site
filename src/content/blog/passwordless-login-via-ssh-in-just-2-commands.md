---
title: 'Passwordless login via ssh in just 2 commands!'
date: '2013-11-16 20:00'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","ssh"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

I already wrote some earlier posts on this topic; but I found a new
command: ssh-copy-id; it's brilliant.

First create your SSH Keypair by running ssh-keygen this will create an
id_rsa and id_rsa.pub file. The pub file is what goes on the servers,
the private key (id_rsa) is what stays with you and is how you identify
yourself.

Next copy the public key to your server with ssh-copy-id <user@server>
replacing user with your remote user and server with the machine DNS
name or IP address. It'll prompt for your SSH password, enter it and if
all completes successfully you'll be able to access the machine via ssh
<user@server> without needing a password.

``` {.bash}
ssh-keygen
ssh-copy-id user@server
```

It will create a authorized_keys if needed; or add an entry to it.
