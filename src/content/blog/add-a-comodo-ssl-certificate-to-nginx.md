---
title: 'Add a Comodo SSL certificate to NGINX'
date: '2015-01-05 22:17'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","javascript","git","nginx"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

The comodo SSL certs via <https://ssls.com> are very cheap. Install
instructions for a Nginx based webstack:

Create signing request:

``` {.bash}
cd /etc/nginx/ssl
mkdir example.com
cd example.com
openssl req -nodes -newkey rsa:2048 -keyout example.com.key -out example.com.csr
```

Copy paste the content of the csr on ssls.com, choose webserver other.
Fill out the next page with info about your organisation.

You'll receive a zip with a bunch of files. Copy the files to the
webserver

``` {.bash}
scp * root@server:/etc/nginx/ssl/example.com/
```

Login on the server and go to /etc/nginx/ssl/example.com/ Now create the
bundle_ssl.crt

``` {.bash}
cat example_com.crt COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt >> ssl-bundle.crt
```

Add to conf (I already had SSL running with fake certifcates):

``` {.bash}
ssl_certificate         /etc/nginx/ssl/example.com/ssl-bundle.crt;
ssl_certificate_key     /etc/nginx/ssl/example.com/example.com.key;
ssl_prefer_server_ciphers on;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_ciphers ECDHE-RSA-AES256-SHA:DHE-RSA-AES256-SHA:DHE-DSS-AES256-SHA:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA;
ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
keepalive_timeout    70;
```

More info: <https://gist.github.com/bradmontgomery/6487319>
