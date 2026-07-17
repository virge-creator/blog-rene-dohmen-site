---
title: 'Trying Product Wiki across three microservices'
date: '2026-06-27 12:00'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","ai","agents","spec-driven-development","claude-code","microservices","devops"]
thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop'
status: 'draft'
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

My honest first reaction: that is a lot of clutter to drop into an existing service repo. Eight new top-level folders plus generated config is a big footprint for something I am still evaluating. It is not that any single folder is wrong, it is that the whole thing landing in the root of a clean microservice felt heavy.

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

This matches how Product Wiki describes itself anyway. The whole point is to record product-level intent above the code, and for a set of microservices the product *is* the combination, not any one service.

## Pointing one wiki at three projects

This is where I am still experimenting, and I want to be upfront that it is early. Product Wiki's documented happy path is "run init inside the repo you are working on." Using it as an umbrella over sibling repos is me bending the tool toward how I think about the system, not a blessed workflow.

What I am trying:

1. Keep the harness in its own `product-wiki/` directory at the parent level.
2. Describe each service as its own area inside the `wiki/`, with the shared contracts and boundaries as first-class units.
3. Let the agent read across all three service repos when it compiles a change, so a decision that touches the gateway and the billing service is captured once, in one place.

The Product Wiki loop itself is the appealing part, regardless of where it lives:

1. **propose-change** clarifies the request and asks the questions you would hope a careful engineer asks.
2. **apply-wiki-change** updates the wiki once you approve.
3. **compile-change** turns the approved decision into design notes, checks, and the minimal code to satisfy it.
4. **routine-runner / ratchet-lint** makes sure coverage does not quietly regress.
5. **reconcile-wiki** flags drift between the wiki, the checks, and the actual code.

That last step is the one I care about most for a microservice setup. Drift between services is exactly the kind of thing that rots a system: the contract says one thing, two of the three services agree, and the third silently disagrees until something breaks in production.

## Early impressions

Things I like so far:

- The core idea is right. Recording intent above the code, and actively reconciling it, is a real answer to agents that "reason only from current code and chat."
- The five-step loop is sensible and maps cleanly onto how I already want changes to flow.
- Putting the harness one level up keeps my service repos clean and gives the cross-service decisions a proper home.

Things I am still chewing on:

- The default `init` footprint is heavy for a single repo. Moving it up a level was my fix, but it means I am off the documented path.
- Pointing one wiki at multiple sibling repos is not (yet) an obvious first-class feature. I am making it work, but it is a setup I had to design rather than one the tool handed me.
- I have not yet pushed enough real changes through the loop to know how well `reconcile-wiki` catches genuine cross-service drift versus noise.

## Where I will take it next

The plan is to drive a couple of real changes through the full loop, the kind that touch two of the three services at once, and see whether the umbrella wiki actually keeps the contracts honest. If it does, this becomes a permanent fixture in my multi-service projects. If the cross-repo bending fights me too much, I will fall back to one wiki per service and accept the folder clutter as the price of staying on the supported path.

Either way, the underlying bet, that agents work better with an explicit, maintained record of decisions sitting above the code, feels correct. More once I have run enough real changes through it to have an opinion worth trusting.

---

*Product Wiki: [github.com/omarismailb/product-wiki](https://github.com/omarismailb/product-wiki)*
