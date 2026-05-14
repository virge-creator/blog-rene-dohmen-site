---
title: 'Configure a custom Amazon Lambda runtime to run lilypond'
date: '2019-07-15 16:48'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript","git","music","devops"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

> You can implement an AWS Lambda runtime in any programming language. A
> runtime is a program that runs a Lambda function's handler method
> when the function is invoked. You can include a runtime in your
> function's deployment package in the form of an executable file named
> bootstrap.

As defined by Amazon itself in the docs.

Luckily I found a Github repo, that contains all stuff to add lilypond
to the runtime:
[LilyBin-github](https://github.com/LilyBin/lambda-compile). It looked a
bit abandoned though, so time to dive in and try to learn enough about
custom runtime's in the process.

Build lilypond and deploy runtime
=================================

The github repo contains scripts to download a lilypond binary and add
it with some lilypond fonts to the runtime. It also contains scripts to
administer a new Amazon Lambda function.

The project contains scripts to load (and install lilypond if needed),
most of the stuff is handled by the AWS javascript SDK. Time to check
your credentials in:

``` {.bash}
~/.aws/credentials
```

The script in *tools/* and *deploy/* contained some hard coded stuff. I
uses a hardcoded IAM role, so I created a fresh one that could be used
to create Lambda functions via the IAM portal, Roles etc.

The scripts in my fork assume a *\[default\]* profile. To get it working
I also needed to set the nodejs version to "*nodejs10.x*" in the
command that used the javascript AWS SDK to create and register the new
lambda function.

I also updated the aws package and edited the *.babelrc* file to set the
project to a node10 compliant babel preset.

After fiddling around in update.sh, untar.sh and create.sh I got a
working build with:

``` {.bash}
./deploy/create.sh stable
cd test
./live.sh stable
```

That created a new AWS Lambda function that I could inspect in the
Amazon Lambda Gateway. Cool!

But, of course, it had errors as the stuff is older then 2 years, which
is an era in jscript country. So I went ahead and applied the
outstanding PR, deleted the function and ran the *create.sh* script
again. More luck this time as I now could see

Image: amazon-lambda-serverless-lilypond-1.png

Which indicated that I had a problem with the lilypond binary, but that
the rest of the AWS lambda function, including the jscript part that
does the console logging, just worked fine.
