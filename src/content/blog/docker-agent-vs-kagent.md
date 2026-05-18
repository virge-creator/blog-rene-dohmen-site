---
title: 'Docker Agent vs Kagent: AI Agents With and Without Kubernetes'
date: '2026-05-18 12:00'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","docker","kubernetes","ai","agents","mcp","devops"]
thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop'
status: 'published'
---

I've been running [Kagent](https://kagent.dev) in production for a client — a fleet of AI agents that talk to the Workflow Orchestrator (WFO), IMS, IPAM, and Jira within the [workfloworchestrator.org](https://workfloworchestrator.org) program. It works well. Agents are Kubernetes CRDs, they're GitOps-managed, and the MCP integration lets them reach into any system we need.

But not every team has a Kubernetes cluster. Not every project justifies one. So when Docker released **Docker Agent** — an open-source framework for building AI agent teams that runs anywhere Docker does — I wanted to understand: can I get the same agent capabilities without K8s?

This post documents what Docker Agent can do, how it compares to Kagent, and when you'd pick one over the other.

## Docker Agent: What Is It?

[Docker Agent](https://github.com/docker/docker-agent) is an open-source framework for building **teams of specialized AI agents**. Instead of one generalist model, you define agents with specific roles that collaborate to solve problems. It's included in Docker Desktop 4.63+ and installable standalone via Homebrew.

The key design principle: agents are defined in YAML, run from your terminal, and use any LLM provider.

Here's a minimal two-agent team:

```yaml
agents:
  root:
    model: openai/gpt-5-mini
    description: Bug investigator
    instruction: |
      Analyze error messages and stack traces.
      Delegate fixes to the fixer agent.
    sub_agents: [fixer]
    toolsets:
      - type: filesystem
      - type: mcp
        ref: docker:duckduckgo

  fixer:
    model: anthropic/claude-sonnet-4-5
    description: Fix implementer
    instruction: |
      Write minimal, targeted fixes for diagnosed bugs.
    toolsets:
      - type: filesystem
      - type: shell
```

Run it:

```bash
docker agent run debugger.yaml
```

That's it. No cluster, no CRDs, no operators. Just a YAML file and a terminal.

## Kagent: The Kubernetes-Native Approach

For context, here's what Kagent does differently. Kagent agents are **Kubernetes Custom Resources**:

```yaml
apiVersion: kagent.dev/v1alpha2
kind: Agent
metadata:
  name: wfo-troubleshooter
  namespace: kagent
spec:
  declarative:
    systemMessage: |
      You are a WFO expert. Query workflow status,
      check IPAM allocations, and update Jira tickets.
    modelConfig:
      name: openai-gpt4
    tools:
      - name: wfo-mcp-tools
      - name: jira-mcp-tools
      - name: ipam-mcp-tools
```

Deploy with `kubectl apply`. Agents live in the cluster, managed by the Kagent controller (Go-based) while the reasoning loop runs in Python. You get RBAC, namespace isolation, GitOps workflows, and the full Kubernetes operational model.

In our WFO setup, this means:

- A **WFO agent** that queries workflow status and triggers actions
- An **IMS agent** that checks inventory management state
- An **IPAM agent** that validates IP allocations
- A **Jira agent** that creates/updates tickets based on the above
- A **planning agent** that coordinates the team via A2A protocol

All of this runs in the cluster, scales with the cluster, and is observed with OpenTelemetry.

## Feature Comparison

Let's get specific about what each platform offers:

| Feature | Docker Agent | Kagent |
|---|---|---|
| **Runtime** | Docker Desktop / standalone binary | Kubernetes cluster |
| **Agent definition** | YAML file | Kubernetes CRD |
| **Multi-agent teams** | Yes (root + sub_agents) | Yes (agents + teams via A2A) |
| **MCP tool support** | Native (via MCP Gateway) | Native (MCPServer CRD) |
| **LLM providers** | OpenAI, Anthropic, Google, Ollama, etc. | Same (via ModelConfig) |
| **Agent discovery** | Docker Hub (OCI artifacts) | Kubernetes API / A2A protocol |
| **Sharing/distribution** | `docker agent share push/pull` | Container images + CRDs |
| **Persistence** | Stateless (runs in terminal) | Persistent (K8s pods) |
| **Scaling** | Single machine | Kubernetes horizontal scaling |
| **RBAC** | Docker permissions | Kubernetes RBAC |
| **Observability** | Docker logs | OpenTelemetry tracing |
| **GitOps** | Git + manual apply | ArgoCD / Flux native |
| **A2A protocol** | Not yet | Yes |
| **Dynamic tool discovery** | Yes (Dynamic MCP) | Via MCP + tool registry |
| **Infrastructure needed** | Docker Desktop | Kubernetes cluster |
| **Setup time** | 5 minutes | 30+ minutes |

## Where Docker Agent Shines

### 1. Zero-Infrastructure Agent Teams

The killer feature is simplicity. You need:

- Docker Desktop (or just the `docker-agent` binary)
- An API key for your LLM provider
- A YAML file

That's a 5-minute path to a working multi-agent system. For prototyping, personal tooling, or small team setups, this is unbeatable.

### 2. The MCP Gateway

Docker's MCP Gateway is a genuine innovation. It acts as a **unified control plane** that consolidates multiple MCP servers into a single endpoint. When Docker Desktop has MCP Toolkit enabled, the Gateway runs automatically in the background.

Even better: **Dynamic MCP** lets agents discover and compose MCP servers *on-demand during conversations*, without manual configuration. An agent can say "I need to query a database" and the Gateway will find and connect the appropriate MCP server.

```yaml
agents:
  root:
    model: claude-sonnet-4-5
    description: Infrastructure assistant
    toolsets:
      - type: mcp
        ref: docker:postgres    # From Docker MCP Catalog
      - type: mcp
        ref: docker:github
      - type: mcp
        ref: docker:slack
```

The `docker:` prefix pulls MCP servers from Docker's catalog — curated, security-reviewed, containerized. No npm install of random packages.

### 3. OCI-Based Sharing

Agent configurations can be pushed and pulled like container images:

```bash
# Share your agent team
docker agent share push ./wfo-debugger.yaml acidjunk/wfo-debugger

# Someone else pulls and runs it
docker agent share pull acidjunk/wfo-debugger
docker agent run acidjunk/wfo-debugger
```

This makes agent distribution trivial. Package your WFO agent team, push it to Docker Hub, and anyone with Docker can run it.

### 4. Local Development and Testing

Before deploying agents to a Kagent cluster, you can prototype them locally with Docker Agent. The YAML structure is similar enough that the mental model transfers.

## Where Kagent Still Wins

### 1. Production Multi-Tenancy

If you're running agents for multiple teams, clients, or environments, Kubernetes gives you namespace isolation, RBAC, resource quotas, and network policies out of the box. Docker Agent on a single machine doesn't have an equivalent.

### 2. Agent-to-Agent Protocol (A2A)

Kagent supports the [A2A protocol](https://kagent.dev/docs/kagent/examples/a2a-agents) for inter-agent communication. A planning agent can discover other agents in the cluster and delegate tasks. Docker Agent has sub_agents for hierarchical delegation, but not the same level of dynamic agent discovery.

### 3. Persistent, Always-On Agents

Kagent agents run as Kubernetes pods — they're always on, can be health-checked, auto-restarted, and scaled. Docker Agent is designed to run from a terminal session. You *can* daemonize it, but that's not its primary model.

### 4. The Kubernetes Ecosystem

If your agents need to interact with Kubernetes resources (which ours do — WFO runs on K8s), Kagent has native tools for kubectl, Prometheus, Argo, Istio, and more. Docker Agent can access these via MCP servers, but it's an extra hop.

## My Recommendation: Use Both

Here's how I'm thinking about it for the WFO project:

```
┌──────────────────────────────────────────┐
│           Development Flow               │
│                                          │
│  1. Prototype agents with Docker Agent   │
│     (local, fast iteration)              │
│                                          │
│  2. Test MCP tool integrations locally   │
│     (Docker MCP Gateway)                 │
│                                          │
│  3. Deploy to Kagent for production      │
│     (K8s CRDs, GitOps, scaling)          │
│                                          │
│  4. Share agent configs via OCI          │
│     (Docker Hub distribution)            │
└──────────────────────────────────────────┘
```

**Docker Agent** for:

- Rapid prototyping and local development
- Personal automation and dev tooling
- Teams without Kubernetes infrastructure
- Quick demos and proof-of-concepts
- MCP tool testing before production deployment

**Kagent** for:

- Production multi-agent systems
- Always-on monitoring and troubleshooting agents
- Multi-tenant environments
- Systems that need Kubernetes-native integration
- Agent teams that need A2A coordination

## A Practical Example: WFO Without K8s

Let's say you want to build a WFO helper agent but don't have a Kubernetes cluster. Here's what it looks like with Docker Agent:

```yaml
agents:
  root:
    model: anthropic/claude-sonnet-4-5
    description: WFO Operations Assistant
    instruction: |
      You help engineers manage the Workflow Orchestrator.
      Query workflow status, check subscriptions, and
      coordinate with the Jira agent for ticket management.
    sub_agents: [jira_agent]
    toolsets:
      - type: mcp
        ref: docker:postgres  # WFO database
      - type: mcp
        ref: docker:fetch     # WFO REST API
      - type: shell

  jira_agent:
    model: openai/gpt-5-mini
    description: Jira ticket manager
    instruction: |
      Create and update Jira tickets based on WFO
      workflow issues. Use standard templates.
    toolsets:
      - type: mcp
        ref: docker:jira
```

```bash
docker agent run wfo-helper.yaml
> What's the status of workflow subscription SUB-12345?
```

The agent queries the WFO database via MCP, checks the REST API for current state, and if there's an issue, delegates to the Jira agent to create a ticket. All from your laptop.

Is it as robust as the Kagent production setup? No — it's not persistent, doesn't scale, and lacks K8s-native RBAC. But it's **running in 5 minutes** instead of requiring a cluster setup, and it's a great way to validate agent logic before committing to infrastructure.

## Bottom Line

The AI agent space is splitting into two clear tiers:

1. **Docker Agent**: developer-friendly, local-first, YAML-defined, MCP-native. Perfect for individuals, small teams, and prototyping.
2. **Kagent**: Kubernetes-native, production-grade, CRD-defined, A2A-capable. Built for platform teams running agents at scale.

They're not competitors — they're **complementary**. Docker Agent is where you build and test. Kagent is where you deploy and operate. And MCP is the protocol that lets them speak the same language.

The real winner? The developer who uses both.

---

*Docker Agent: [github.com/docker/docker-agent](https://github.com/docker/docker-agent) | Kagent: [kagent.dev](https://kagent.dev) | WFO: [workfloworchestrator.org](https://workfloworchestrator.org)*
