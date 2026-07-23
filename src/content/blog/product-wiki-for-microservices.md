---
title: 'Trying Product Wiki across three microservices'
date: '2026-07-23 12:00'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","ai","agents","spec-driven-development","claude-code","microservices","devops"]
thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop'
status: 'published'
---

I keep an eye on tools that try to make AI coding agents less forgetful. [Product Wiki](https://github.com/omarismailb/product-wiki) is one of the more interesting ones I have run into lately. The pitch: a natural-language layer that sits above your code and records *what* you decided and *why*, instead of leaving the agent to reason purely from the current source and the last few chat messages. In other words, spec-driven development with a harness that keeps the spec and the implementation in sync.

I wanted to see what that feels like in practice, so I gave it a spin.

## First run: a lot of folders

The getting-started command is exactly what you would expect:

```bash
npx product-wiki@latest init
```

Run that inside a project and it scaffolds a managed harness. The thing is, "a harness" turns out to mean quite a few directories:

- `wiki/`: the product wiki scaffold and design-system notes
- `intake/`: proposal templates and raw requests
- `templates/`: starter files for proposals, wiki units, and compiler plans
- `schemas/`: JSON schemas for proposals and wiki units
- `routines/`: drift checks for architecture and traceability
- `scripts/`: CLI gates, lint loops, and sync tools
- `checks/`: baselines and verification manifests
- `examples/`: populated examples

On top of that it wires routing into `AGENTS.md` / `CLAUDE.md` and adds a set of `pw:*` npm scripts to your `package.json`.

My first reaction: that is a lot of clutter to drop into an existing service repo. Eight new top-level folders plus generated config is a big footprint for something I am still evaluating. It is not that any single folder is wrong, it is that the whole thing landing in the root of a clean microservice felt heavy.

## Rethinking where the wiki should live

The folder sprawl actually nudged me toward a better mental model. I run three small microservices that really form one product. Each service has its own repo and its own concerns, but the *decisions* that matter, the contracts between them, the shared domain language, the "why did we split this here" reasoning, do not live inside any single service. They live in the space between them.

So instead of running `init` inside one service, I went one folder higher:

```
~/projects/
├── product-wiki/        <- the harness lives here now
│   ├── wiki/
│   ├── intake/
│   ├── schemas/
│   └── ...
├── service-auth/
├── service-billing/
└── service-gateway/
```

The idea: one overarching Product Wiki at the parent level, pointed at all three services, capturing the product as a whole rather than scattering eight folders into each repo. Each microservice stays clean. The cross-cutting decisions get a single home.

This matches how Product Wiki describes itself anyway. The whole point is to record product-level intent above the code and for a set of microservices the product *is* the combination, not any one service.

## Pointing one wiki at three projects

This is where I have to be upfront: it is early days, both for the tool and for my experiment. Product Wiki's documented happy path is "run init inside the repo you are working on." Using it as an umbrella over sibling repos is me bending the tool toward how I think about the system, not a blessed workflow.

With the harness sitting one level up, I fiddled around and tried to import my existing microservice codebases into the wiki. This is where it failed to amaze me. The import produced wiki units that were technically correct but shallow: a restatement of what the code already says, not the "why" that the pitch promises. To be fair, that is probably inherent to the problem. The interesting decisions were made months ago, in Slack threads and pull request discussions, and no tool can reconstruct those from source code alone. Product Wiki looks like it wants to be there from day one and grow with the product, not be bolted onto three services that already exist.

## Where I landed

For a greenfield project I can see this working: start the wiki at the product level, let every proposal flow through it, and the agent always has the reasoning at hand. The core idea, keeping the *why* in a structured place above the code, is sound and I expect more tools to move in this direction.

For my situation, three existing services with months of history, it did not beat my current workflow. I usually make a plan with Claude and let it write the outcome to tickets. That documents the decisions as a side effect, and it fits an agent-based engineering approach just fine. If you want a more polished version of that idea, have a look at [linear.app](https://linear.app): it combines the documentation and the planning in one place, and it is immediately visible to stakeholders and project managers instead of living in a folder only the agents read.

So: no adoption for now, but it goes on the "check again in six months" list. The problem Product Wiki is attacking is real, agents really do forget why the code looks the way it does. I am just not convinced the answer is eight folders in my repo root. Yet.

---

*Product Wiki: [github.com/omarismailb/product-wiki](https://github.com/omarismailb/product-wiki)*
