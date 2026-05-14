---
title: 'Configure a Squid proxy to use multiple from addresses'
date: '2019-05-21 03:44'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","python","javascript","linux","ansible"]
thumbnail: '/images/thumbnails/linux.png'
status: 'published'
---

For some acceptance tests it can be very handy to test webapplications
from a couple of SRC IP addresses. There are multiple ways to do it but
I wanted to use a simple linux box at home that can be connected to a
LAN and a WIFI with separate internet connections. The setup would work
for most laptops and raspberry pi's especially when combined with a
hotspot from a smart phone. Furthermore it's very easy to add an extra
TCP port forward so the proxy itself is reachable/exposed over the
internet.

The resulting proxy is actively in use by the guys from
<https://www.leadexpress.nl>

Situation
=========

``` {.bash}
LAN network: 192.168.20.0/24 -> 192.168.20.1 gateway, 192.168.20.10 proxy
WIFI network: 192.168.30.0/24 -> 192.168.30.1 gateway, 192.168.30.10 proxy
```

*The proxy should work for all clients that can reach the proxy server
at 192.168.20.10:5001 or 192.168.30.10:5002*

Ubuntu 18.04 + squid installed

Configuring squid
=================

Squid's default config has all the documentation in it, comment style.
Perfect, but also very clumsy and large. For now it left it as is, but
when I switch to an Ansible powered solution I will rewrite the config
to be as clean as possible.

Change 1
--------

Enable the proxy on a couple of ports. Search for the "http_access deny
all"

``` {.ini}
acl acid5001 myportname 5001
http_access allow acid5001
tcp_outgoing_address 192.168.20.10 acid5001

acl acid5002 myportname 5002
http_access allow acid5002
tcp_outgoing_address 192.168.30.10 acid5002

http_access deny all
```

*Note:* It could be necessary to explicitly force stuff to ipv4 to avoid
weird networking stuff, more info:
[squid_dns_v4_first](http://www.squid-cache.org/Doc/config/dns_v4_first/).

Change 2
--------

Enable the proxy on a couple of ports. Search for the "http_port 3128"
and replace it with:

``` {.ini}
http_port 192.168.20.10:5001 name=5001
http_port 192.168.20.10:5002 name=5002
```

*Note:* with this setup I only listen on one of the interfaces for
incoming proxy requests. You don't need to add the IP address at all if
you want to listen on all interfaces. It depends on how you want to
reach the proxy itself: you could also use the username or src ip
address of the client to determine which of the incoming connections
belong together.

Change 3
--------

As we don't use squid as a cache at all you can tweak some other stuff.

Search for

``` {.bash}
#Default:
# shutdown_lifetime 30 seconds
```

And replace it with

``` {.ini}
shutdown_lifetime 0 seconds
```

Test networking setup with CURL
===============================

In almost all linux setups with DHCP just one standard gateway will be
used for internet access. You'll have to manually configure additional
gateways if you want to use them.

On my box the LAN card: **ens1f2** is used to reach the standard
gateway, and **wlp3s0** is my WIFI NIC. While **ens1f2** is up the wifi
card's gateway isn't used. Some network-manager daemon normally deals
with network changes, which we now want to configure manually.

You can test, which gateway is used by issuesing an outgoing HTTP
request with curl:

``` {.bash}
curl --interface "192.168.20.10" https://api.ipify.org/?format=json
curl --interface "192.168.30.10" https://api.ipify.org/?format=json
```

It will output the outgoing IP address in JSON format. If your box uses
one gateway both will come from the same IP.

Setup routing
=============

So I appended my 2 network cards to the iproute2 config, to add some
routes on my own.

``` {.bash}
sudo vim /etc/iproute2/rt_table
```

``` {.ini}
#
# reserved values
#
255     local
254     main
253     default
0       unspec
# added by me
1       ens1f2  # MY LAN NIC
2       wlp3s0  # MY WIFI NIC
```

Then I manually added info to the routes table to ensure that traffic
from **wlp3s0** would be routed over the correct gateway

``` {.bash}
sudo ip route add 192.168.30.0/24 dev wlp3s0 table wlp3s0
sudo ip route add default via 192.168.30.1 dev wlp3s0 table wlp3s0
sudo ip rule add from 192.168.30.10/32 table wlp3s0
sudo ip rule add to 192.168.30.10/32 table wlp3s0
```

Now the curl tests should return the correct outside address for boths
tests! Please verify this before debugging squid config. I lost a couple
of hours before I realised that I needed some routing, blaming the error
to something in the squid config.

Tests
=====

To test the proxy setup I used a very small python script:

``` {.python}

URL = "https://api.ipify.org/?format=json"

PROXY1 = os.getenv("PROXY1")
PROXY2 = os.getenv("PROXY2")
EXPECTED1 = os.getenv("EXPECTED1")
EXPECTED2 = os.getenv("EXPECTED2")

if not PROXY1 or not PROXY2 or not EXPECTED1 or not EXPECTED2:
    print("Please set needed ENV vars. E.g. start like this:")
    print("PROXY1=192.168.1.200:5001 PROXY2=192.168.6.1:4002 EXPECTED1=123.123.123.123 EXPECTED2=124.124.124.124 python main.py")
    sys.exit()

if __name__ == "__main__":
    proxy = f"http://{PROXY1}"
    print(f"Testing proxy 1: with proxy_addr: {proxy}")
    response = requests.get(URL, proxies={"http": proxy, "https": proxy}).json()
    assert response["ip"] == EXPECTED1, response["ip"]
    print("Proxy 1: OK")

    proxy = f"http://{PROXY2}"
    print(f"Testing proxy 2: with proxy_addr: {proxy}")
    response = requests.get(URL, proxies={"http": proxy, "https": proxy}).json()
    assert response["ip"] == EXPECTED2, response["ip"]
    print("Proxy 2: OK")
```

Sources
=======

Used info from these blogs:
[proxy_info](https://tastyplacement.com/squid-proxy-multiple-outgoing-ip-addresses),
[multiple_nics_linux1](https://nims11.wordpress.com/2014/03/23/using-multiple-network-interfaces-simultaneously-under-linux-virtualreal/),
[multiple_nics_linux2](http://coderazzi.net/linux/dual_nic_linux.htm)
