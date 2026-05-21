---
title: 'Build your own deployment pipeline hackathon'
date: '2018-03-10 17:05'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript","linux","docker","git","ansible","devops"]
thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
status: 'published'
---

Last Tuesday I attended a trial of a continuous delivery (CD) hackathon
that [will be hosted by Itility on 21
March](https://content.itility.nl/hackatrain-2018). It's not just a
silly event to show of your coding skills: you can actually win prizes
including a 5 day, all inclusive, train journey to Berlin ending at
Europe's leading interdisciplinary technology festival: Tech Open Air
(TOA). You can not only win one of these tickets and be part of the
Itility HackaTrain team, there is also the opportunity to win a Software
traineeship at Itility's HQ.

During the first round 3 teams will compete with each other. After that
there is second round which determines who goes to Berlin. The first
round will be a battle between TU Eindhoven & Brightlands campus on
March 21. In this hackathon students from TU/e will compete against
students/startups from Brightlands campus. It's also possible to [sign
up](https://content.itility.nl/hackatrain-2018) if you are not from the
TU/e or Brightland Campus, later in March or April.

The goal of the first hackathon round is to setup continuous integration
(CI) tests for a small NodeJS project and to build a continuous
deployment (CD) pipeline that automatically deploys the project to test,
staging and production environments when pull request are accepted. The
CI tests will be limited to build a production build when the linting of
the source code succeeds. As there are a lot of buzzwords in the last
sentence, a quick recap of the used terms and some theory could be
useful. Feel free to skip this if you are already a continuous delivery
guru.

Continuous delivery theory
==========================

Continuous delivery is a software engineering approach in which teams
produce software in short cycles, ensuring that the software can be
reliably released at any time. It aims at building, testing, and
releasing software faster and more frequently. It focuses on the ability
to get changes of all types---including new features, configuration
changes, bug fixes and experiments---into production, or into the hands
of users, safely and quickly in a sustainable way.

Continuous delivery is, so to speak, the next logical step after
continuous integration:
![blogpic-32.png](/images/posts/build-your-own-deployment-pipeline-hackathon/blogpic-32.png)

Why?
----

It is often assumed that when software deployment is done more
frequently, lower levels of stability and reliability will be the
result. There is quite some evidence that this is not the case and it
even true for relatively conservative domains like financial and
government IT services. You can find data for several years as part of
the annual PuppetLabs / DevOps Research and Assessment State of DevOps
Reports on devops-research.com. The
[2014](http://bit.ly/2014-devops-report),
[2015](http://bit.ly/2015-devops-report) and
[2016](http://bit.ly/2016-devops-report). reports are free to download,
after registration. Key results include:

-   The use of continuous delivery practices including version control,
    continuous integration, and test automation predicts higher IT
    performance.
-   Firms with high-performing IT organizations were twice as likely to
    exceed their profitability, market share and productivity goals.
-   Culture is measurable and predicts job satisfaction and
    organizational performance.
-   Continuous Delivery measurably reduces both deployment pain and team
    burn

Process advantages
------------------

Easy releases: the primary goal is to make deployments painless,
effortless and low risk events that can be performed at any time, on
demand.

### Faster time to market

Traditional software deployments can take weeks or months to complete as
software changes are collected in a big release, tested for defects and
regressions on a staging environment and a lot of people in different
teams were needed. When teams work together to automate the build and
deployment, environment provisioning, and regression testing processes,
developers can incorporate integration and regression testing into their
daily work and completely remove these phases.

### Higher quality

When developers have automated tools that discover regressions within
minutes, teams are freed to focus their effort on user research and
higher level testing activities such as exploratory testing, usability
testing, and performance and security testing.

### Better products

By delivering work in smaller batches faster to users the feedback loop
for user stories is a lot shorter. Techniques like automated A/B testing
can be used to optimize the customer journey.

### Happier developer teams

When releases are less painful, team burnout is decreased.

Trend?
------

Personally I believe that the whole DevOps mentality fits perfectly in
the era of Docker. For me they are inextricably linked together. What I
really like about it is the ability to emulate a complex production kind
of system on a cheap laptop. A containerized application stack is
perfect for running tests against different parts of your stack. In an
ideal world you can spin up a docker for each part of your eco system
and run all acceptance, chain tests and stress tests in this
containerized environment. You can even test high availability and
automatic failover including the scale-ability of your stack.

The build process of the docker images made a the builds of a lot of
software in the Open Source community a lot more stable in the last
years as stuff like Open Source libraries and programming languages are
built a zillion times each day. Running unit tests for developers in CI
tools like Gitlab, Bitbucket, Travis, Buildkite have one thing in
common: they all use/support running tests in dockers that rely on
building an environment first. When the tests succeed in a dockerized
environment you actually have a snapshot of all the components in your
real system. The eco system is getting stable enough to just deploy the
same containers used for testing to production, like Google does with
kubernetes. There are big advantages in deploying not only the new
release but to build and deploy a clean and new infrastructure, during
the deployment, every time a new release is delivered.

I am not saying that you can only achieve continuous delivery with
docker but merely stating that it increased the quality of all
components needed for a successful continuous delivery strategy.

Hackathon trial
===============

During the trial we collaborated with a small team of 3 persons to work
on the assignments, that consisted out of 3 mandatory user stories and
one, nice to have, bonus user story. In the beginning I was a bit
skeptical about the achievability, but the project and the assignments
itself were fun and the instructions simple enough so we did manage to
setup a pipeline rather quick. As a seasoned freelance developer I'm
used to having an automated continuous integration software street for
my day to day activities. Often this was provided by one of the other
team members and I would only do some fine tuning were needed. The last
2 projects I worked on also used automated deployment scenarios to a
Docker Swarm and a Kubernetes cluster respectively, at least for the
development, test and staging environments. But my personal experience
in setting it up from scratch was very limited; I still deploy my
personal hobby projects with a combination of Ansible on some
preconfigured VPS systems. So this was my first time setting up a
enterprise grade deployment pipeline. It was a lot of fun, especially
when you see it, in action, with a successful deploy the first time.

Conclusion
==========

Our team completed 3 of the 4 goals in the given time: so I'm very
proud on my team as we won not only the hackathon trial but also enjoyed
a good dinner, enjoyed some quality time with like minded experts, drunk
some beers and achieved eternal glory!

[Image: image1]

I would like to thank Itility for organizing the event and for the
opportunity to be involved with the trial hackathon. I can only assume
that you will enjoy the hackathon as much as I did. Interested? You can
[sign up](https://content.itility.nl/hackatrain-2018) here
