---
title: 'Send mail via Gmail from a local postfix server on Ubuntu'
date: '2014-12-16 23:22'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","linux","tutorial"]
thumbnail: '/images/thumbnails/music.jpg'
status: 'published'
---

If you want to use Gmail for sending mails from postfix follow this
guide.

First, install all necessary packages:

``` {.bash}
sudo apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules
```

If you do not have postfix installed before, postfix configuration
wizard will ask you some questions. Just select your server as *Internet
Site* and for FQDN use something you like or if you have a FQDN; use
that.

Add the following lines to /etc/postfix/main.cf

``` {.bash}
relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_tls_CAfile = /etc/postfix/cacert.pem
smtp_use_tls = yes
```

Create a new file /etc/postfix/sasl_passwd to store the Gmail
credentials:

``` {.bash}
[smtp.gmail.com]:587    YOURGMAILUSER@gmail.com:YOURGMAILPASSWORD
```

Note: If you want to use your Google App's domain, just replace
\@gmail.com with your \@yourgoogleappsdomain.com

Fix permission and update postfix config to use sasl_passwd file:

``` {.bash}
sudo chmod 400 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd
```

Next, validate certificates to avoid running into error. Just run
following command:

``` {.bash}
cat /etc/ssl/certs/Thawte_Premium_Server_CA.pem | sudo tee -a /etc/postfix/cacert.pem
```

Restart your postfix server:

``` {.bash}
sudo /etc/init.d/postfix restart
```

Note: you can ignore errors like: *warning: /etc/postfix/main.cf, line
43: overriding earlier entry: relayhost=*

Test your setup with:

``` {.bash}
echo "Hello there, this is a test mail from postfix via Gmail." | mail -s "Test" you@example.com
```

Troubleshooting
===============

If you run into troubles you probably are sending mail from a new IP of
from a Gmail address that wasn't used before.

In maillog you will find something like: Error: "SASL authentication
failed; server smtp.gmail.com"

You need to unlock the captcha by visiting this page
<https://www.google.com/accounts/DisplayUnlockCaptcha>

You can run test again after unlocking captcha.
