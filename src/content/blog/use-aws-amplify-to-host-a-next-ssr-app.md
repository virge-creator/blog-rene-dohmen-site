---
title: 'Why we ditched AWS Amplify for Vercel'
date: '2024-01-29 01:15'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript","aws","vercel","nextjs","devops"]
thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop'
status: 'published'
---

As you could read in previous posts, I deploy some frontend apps on Amazon. For a while, AWS Amplify seemed like the obvious choice for hosting Next.js SSR applications — it's AWS, it should "just work", right? Well, after months of frustration, we made the switch to Vercel. Here's why.

## The honeymoon phase

Our first project on AWS Amplify was a straightforward Next.js app. Single repo, a few pages, some API routes — nothing fancy. And honestly? It worked great. The setup was simple: connect your GitHub repo, configure the build settings, and you're live. AWS Amplify detected Next.js automatically and handled the SSR deployment via Lambda@Edge.

We were happy. The CI/CD pipeline worked, the app was fast enough, and we had the comfort of staying within the AWS ecosystem where our other services lived.

## Then came the monorepo

Everything went sideways when we migrated to a Turborepo monorepo. We had multiple Next.js apps sharing a component library and some utility packages — a very common setup in 2024. This is where Amplify started showing its ugly side.

### Random build failures

The builds would fail randomly. Not every time — maybe 1 in 3 or 4 deployments. The error messages were absolutely cryptic:

```
[ERROR]: !!! Build failed
Error: Failed to publish asset 41bdd0b5e368e73d1b9...
```

That's it. No stack trace, no indication of *what* actually went wrong. Sometimes rerunning the exact same commit would succeed. Other times it would fail three times in a row, then magically work on the fourth attempt.

We dove into the GitHub issues for `amplify-hosting` and found [dozens of developers](https://github.com/aws-amplify/amplify-hosting/issues) reporting the exact same problem. Monorepo setups with Turborepo or Nx were particularly affected. The common "solutions" were:

- Increase build timeout (we were already at the max)
- Use a custom build image
- Break your monorepo into separate builds
- Clear the Amplify cache and retry

None of these actually solved the underlying issue. The builds kept failing sporadically, and our team started losing trust in the deployment pipeline.

### Build times from hell

Even when builds succeeded, they were painfully slow. A Next.js app that built locally in about 2-3 minutes would consistently take **15+ minutes** on Amplify. We tried everything:

- Caching `node_modules` and `.next` — minimal improvement
- Using a larger build instance — not available on Amplify
- Optimizing our Turborepo pipeline — helped locally but Amplify didn't benefit

This matched what others were reporting online. One Reddit user summed it up perfectly: *"My small site builds in about 25s from cold on my mac and takes over 10 minutes on Amplify."*

### Cold start nightmares

The SSR performance itself was another pain point. AWS Amplify deploys Next.js SSR routes as Lambda@Edge functions, which means cold starts. For our app, a cold start could add **3-5 seconds** to the initial page load. For an e-commerce project where first impressions matter, this was unacceptable.

We experimented with provisioned concurrency and warming strategies, but the Lambda@Edge integration in Amplify didn't give us enough control over these settings.

## The switch to Vercel

After three months of fighting Amplify, we decided to try Vercel for one of our projects. The difference was night and day.

### What immediately improved

**Build times**: That 15-minute Amplify build? **Under 3 minutes on Vercel.** Vercel's build infrastructure is clearly optimized for Next.js — which makes sense, given they created the framework.

**Monorepo support**: We pointed Vercel at our Turborepo monorepo, configured the root directory, and it just worked. No random failures, no cryptic errors. Turborepo's remote caching with Vercel is a first-class feature.

**No cold starts**: Vercel's Edge Runtime and Serverless Functions handle SSR without the brutal cold starts we experienced on Lambda@Edge. Pages load consistently fast.

**Preview deployments**: Every PR gets a unique preview URL. Amplify has this too, but Vercel's implementation is smoother and more reliable.

### What we gave up

It wasn't all roses. Moving to Vercel meant:

- **Leaving the AWS ecosystem**: Our backend services (RDS, SQS, Lambda) are still on AWS. The frontend now lives on Vercel, adding a bit of architectural complexity.
- **Pricing at scale**: Vercel's pricing can get expensive for high-traffic apps. For our use case, the developer productivity gains more than made up for it.
- **Less control**: With Amplify you can customize the build environment extensively. Vercel is more opinionated — but those opinions are usually correct.

## The verdict

AWS Amplify is a solid product for simple, single-repo Next.js deployments, especially if you're deep in the AWS ecosystem. But the moment you introduce monorepos, complex build pipelines, or need consistent SSR performance, it starts to crack.

Vercel exists because Amplify (and similar platforms) didn't nail the developer experience for Next.js. It's purpose-built for the framework, and it shows. Our deployments went from "fingers crossed, hope it builds" to "push and forget."

If you're currently battling Amplify issues with your Next.js monorepo, do yourself a favor: try Vercel for a week. You might not go back.

## TL;DR

| | AWS Amplify | Vercel |
|---|---|---|
| Simple Next.js app | ✅ Works fine | ✅ Works great |
| Monorepo support | ❌ Sporadic failures | ✅ First-class |
| Build time (our app) | ~15 min | ~3 min |
| SSR cold starts | 3-5 seconds | Minimal |
| AWS ecosystem integration | ✅ Native | ⚠️ Separate |
| Price at scale | ✅ Cheaper | ⚠️ Can get pricey |

*Last updated: January 2024. AWS might have improved Amplify since — but at the time of writing, these issues were very real and widely reported.*
