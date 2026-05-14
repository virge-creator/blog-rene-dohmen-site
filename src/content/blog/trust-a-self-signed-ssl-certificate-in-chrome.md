---
title: 'Trust a self signed SSL certificate in Chrome'
date: '2014-08-29 22:51'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","tutorial"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

I've been using Google Chrome as my primary browser for the last few
years. Sorry, Firefox, but with all the stuff I need to work installed,
it's to slow and almost unusable.

Let's say you have a server with a self-signed HTTP SSL certificate.
Every time you hit a page, you get a nasty error message. You ignore it
once and it's fine for that browsing session. But when you restart,
it's back. Unlike Firefox, there's no easy way to say "yes, I know
what I'm doing, ignore this." This is an oversight I wish Chrome would
correct, but until they do, we have to hack our way around it.

Caveat: these instructions are written for Mac OS X. PC instructions
will be slightly different at PCs don't have a keychain, and Google
Chrome (unlike Firefox) uses the system keychain.

So here's how to get Google Chrome to play nicely with your self-signed
SSL certificate:

1.  In the address bar, click the little lock with the X. This will
    bring up a small information screen. Click the button that says
    "Certificate Information."
2.  Click and drag the image to your desktop. It looks like a little
    certificate.
3.  Double-click it. This will bring up the Keychain Access utility.
    Enter your password to unlock it.
4.  Add the certificate to a keychain: I added my own certificates to
    the login keychain, not the System keychain. But if you want to
    trust the certificates for others users of the mac you should add it
    to System keychain.
5.  Click "Always Trust," even though this doesn't seem to do
    anything. And type your OSX user password.

Image: Schermafbeelding-2014-08-30-om-00.40.57.png

That's it! Close Keychain Access and restart Chrome, and your
self-signed certificate should be recognized now by the browser.
Warning: it will only work for certificates that have a correct
hostname.
