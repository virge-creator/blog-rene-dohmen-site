---
title: 'SSH 1 and SSH2: Login without passwords'
date: '2010-01-14 21:41'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","ssh","tutorial"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

A great little guide to setting up two accounts so that you don't have
to type in your password when sshing between them. btw, OS X uses
OpenSSH. I don't know what it is for other platforms.

Basic Idea No-password authentication works because of public key
crypto. Let's say you have a local machine Ooga and a remote machine
Booga. You want to be able to ssh from Ooga to Booga without having to
enter your password. First you generate a public/private RSA key pair on
Ooga. Then you send your public key to Booga, so that Booga knows that
Ooga's key belongs to a list of authorized keys. Then when you try to
ssh fromOoga to Booga, RSA authentication is performed automagically.
Here are detailed steps on how to do this. NOTE: The following examples
and scenarios assume you are creating only a single key, e.g. one RSA
key or one DSA key. If it turns out that you've created both keys on
your (client) system, then you will need to send both of them to the
SSH/SSH2 server; otherwise, you may still be asked to enter a
passphrase.

ssh1 If you're using ssh1, then do this: ooga% ssh-keygen -f
\~/.ssh/identity This will generate a public/private rsa1 key pair. When
it asks you to enter your passphrase, just hit return (i.e. leave it
empty). Now you need to send your public key to the remote server. ooga%
cd .ssh ooga% scp identity.pub <user@booga>:\~/.ssh Now you need to log
into Booga and add Ooga's public key to Booga's list of authorized keys.
ooga% ssh <user@booga> booga% cd .ssh booga% cat identity.pub \>\>
authorized_keys booga% chmod 640 authorized_keys booga% rm -f
identity.pub That's it! You can now ssh from Ooga to Booga without
entering your password.

ssh2 It's harder for ssh2. There are two common implementations of ssh2:
OpenSSH and SSH2. Let's say we want to ssh from Ooga to Booga. If Ooga
and Booga both run the same implementation then it's easy. Otherwise, we
need to do some extra work to make them talk to each other properly.

ssh2: Ooga = OpenSSH, Booga = OpenSSH First, generate a public/private
DSA key pair on Ooga. ooga% ssh-keygen -t dsa -f \~/.ssh/id_dsa When you
are asked for a passphrase, leave it empty. Now send the public key to
Booga. ooga% cd .ssh ooga% scp id_dsa.pub <user@booga>:\~/.ssh Next, log
in to Booga and add the public key to the list of authorized keys. ooga%
ssh <user@booga> booga% cd .ssh booga% cat id_dsa.pub \>\>
authorized_keys2 booga% chmod 640 authorized_keys2 booga% rm -f
id_dsa.pub Note that the filename is authorized_keys2, not
authorized_keys. That's it; you're ready to ssh from Ooga to Booga
without having to enter a password.

ssh2: Ooga = OpenSSH, Booga = SSH2 First, generate a public/private DSA
key pair on Ooga. ooga% ssh-keygen -t dsa -f \~/.ssh/id_dsa When you are
asked for a passphrase, leave it empty. This key is stored in a format
that OpenSSH can use, but SSH2 cannot. You need to export the key to a
format that SSH2 understands. ooga% ssh-keygen -e -f .ssh/id_dsa.pub \>
id_dsa_ssh2_ooga.pub Note: the exact flags you need to specify may
differ in your case. Check the man pages if the line above doesn't work.
Now send the exported public key to Booga. ooga% scp
id_dsa_ssh2_ooga.pub <user@booga>:\~/.ssh2/ Note: the target directory
is .ssh2, not .ssh. Next, log in to Booga and add the public key to the
list of authorized keys. ooga% ssh <user@booga> booga% cd .ssh2 booga%
cat \>\> authorization  key id_dsa_ssh2_ooga.pub booga% chmod 640
authorization For SSH2, there is an authorization file in which you list
the file names of the authorized public keys. Note that this step is
different than the case in which Booga is running OpenSSH. Now you are
ready to ssh from Ooga to Booga without having to enter a password.
