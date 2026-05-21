---
title: 'Run an expo webserver with port forwarding'
date: '2020-12-12 12:12'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript","linux","docker","nginx"]
thumbnail: '/images/thumbnails/react-native.png'
status: 'published'
---

When working with React Native it can be easy to start with Expo as it's an excellent way to distribute the app to
a lot of testers. But when you start it a QR code is generated to point your expo client to the server, by default
this only works for you localhost dev setup. And to make it worse, the webserver spawns new app instances on new ports,
which makes it a bit harder to run it from inside a LAN. I could have opted for a small cloud VPS or a docker
container with Node JS, but one of my Ubuntu shuttle PC's at home should also be enough to handle a couple of
testers over my fiber connection.

First I installed NVM from src, the latest node LTS (14.15.1 at the time) and then I installed yarn also form source.

Created a test app with:

``` bash
sudo apt install screen
npm install --global expo-cli
expo init my-app
cd my-app
yarn start
```

Note: You can choose "tabs" for a workflow to get a working BottomTabBar:
![react-native-example-app.png](/images/posts/run-expo-webserver-with-port-forwarding/react-native-example-app.png)

To whole stack can run with two fixed TCP ports. In this post I assume port `30000` and `30000`. If you want to
run more apps you should change the port numbers for consecutive instances.

## Changing the port numbers
Now you have to patch the generated `app.json`. Add this to to "expo" key:

``` json
"packagerOpts": { "port": 30001 }
```

Then create a .exprc: `touch .exprc` and populate it with:

``` json
{ "manifestPort": 30000 }
```

Now the setup is ready and you can start it with.

``` bash
screen
expo start --no-dev --minify --offline --non-interactive --lan
```

Note: The screen part is optional; but if you want to keep it running you can now press `Ctrl-A`, `D` and later on
resume it with `screen -r`

## Almost there
If you are running from LAN: scanning the QR code in the terminal will launch it visa Android/iOS expo
app. The first time a client accesses it after a startup a build will be created and minified. After that it should be
quite snappy to re-launch a working app.

## Optional port forwarding
When you also want to access the app from the internet without a VPN and you are running from behind a NAT router; you
can set up port-fowards. E.G. For the app in the blog post TCP port `30000` and `30001`.

Then you have to generate a
QR code for your external IP address (or DNS name if you have it). In the server console you will see the EXPO url.

Something like: `exp://192.168.1.2:20000`. Replace the internal IP address with the external IP address. So something
like this: `exp://194.109.108.108:20000` or with a FQDN: `exp://wacky-app.formatics.nl:20000`

I used an online [QR Code Generator](https://www.qr-code-generator.com/) to generate me a QR picture that I can scan to
easily start the app and share it with other people.

Note: It should probably also be possible to use a Nginx reverse proxy so you can enable https/SSL. Feel free to
contact me via de comments if you have questions about the setup.

## Conclusion
It's quite easy to run an expo server to serve ad hoc, over the air updating, iOS and Android apps. Without the
need for a Apple developer license. The result also makes it easy to share, test and collaborate with customers. And
the second big benefit for this kind of stack is that React Native can now also be used to create a build that
runs in your browser.

> Build once, Render everywhere.

Theoretically it should now be possible to use the same code for delivering a web app + a truly native mobile app,
With one code base! Finally.
