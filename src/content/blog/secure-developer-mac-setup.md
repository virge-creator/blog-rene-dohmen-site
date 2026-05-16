---
title: 'Practical "Secure-ish" Developer Mac Setup'
date: '2026-05-16 09:00'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","security","macos","devops","privacy"]
thumbnail: '/images/thumbnails/apple.jpg'
status: 'published'
---

Let's be honest: most developers run their Mac wide open. We curl scripts from the internet, pip install random packages, clone repos from strangers, and run Docker containers that could be doing anything. We know better, but security always feels like it's in the way.

This guide is my attempt at a **realistic** security setup for a developer Mac. Not paranoid, not enterprise-grade, not "you need a SIEM and a SOC team." Just practical layers that put you well above most professional developer setups without making your daily workflow miserable.

## The Layers

Here's the full stack, then we'll dive into each one:

| Layer | Tool | Why |
|---|---|---|
| Outbound firewall | Little Snitch | Know what phones home |
| Persistence monitoring | KnockKnock + BlockBlock | Catch malware persistence |
| DNS filtering | NextDNS | Block trackers & malicious domains |
| Secrets management | 1Password + YubiKey | No plaintext secrets, ever |
| Dev isolation | Separate macOS user | Contain the blast radius |
| High-risk code | VM / container | Sandbox untrusted stuff |
| Endpoint scanning | Loki-RS | Detect indicators of compromise |
| Logging | Sysmon-equivalent telemetry | Know what happened |
| Browser hygiene | Separate profiles per trust zone | Compartmentalize browsing |

## Outbound Firewall: Little Snitch

macOS has a built-in firewall, but it only handles *inbound* connections. That's half the story. You want to know what's going *out*.

[Little Snitch](https://www.obdev.at/products/littlesnitch/) intercepts every outbound connection and lets you decide: allow or deny. The first few days are noisy — you'll be approving legitimate connections for Slack, Spotify, your IDE, etc. After that, it runs silently and only pops up when something *new* tries to phone home.

What you'll discover:

- Apps that call analytics services you didn't know about
- Background processes connecting to servers in unexpected countries
- npm/pip packages making network calls during install

```
Pro tip: Set Little Snitch to "Silent Mode - Deny" for a few hours 
and check what breaks. You'll learn a lot about your system.
```

## Persistence Monitoring: KnockKnock + BlockBlock

These are two free tools from [Objective-See](https://objective-see.org/), the gold standard for macOS security tools:

**KnockKnock** scans your Mac for persistently installed software — things that survive a reboot. Launch agents, login items, kernel extensions, browser plugins, cron jobs. Run it periodically and look for anything you don't recognize.

**BlockBlock** is the real-time version: it monitors persistence locations and alerts you the moment something tries to install itself permanently. If malware lands on your Mac, it almost certainly needs persistence. BlockBlock catches that moment.

```bash
# Install via Homebrew
brew install --cask knockknock
brew install --cask blockblock
```

## DNS Filtering: NextDNS

[NextDNS](https://nextdns.io/) is like Pi-hole in the cloud. You configure it once, point your Mac's DNS at it, and it blocks:

- Known malware domains
- Tracking & analytics domains
- Phishing sites
- Cryptomining domains

The free tier gives you 300,000 queries/month (plenty for personal use). The real power is in the logs — you can see exactly what every app on your system is resolving.

Set it up system-wide:

```bash
# Install the NextDNS CLI
brew install nextdns

# Configure with your profile ID
sudo nextdns install -config YOUR_CONFIG_ID
sudo nextdns activate
```

Or just set your DNS servers to the NextDNS IPs in System Settings → Network.

## Secrets: 1Password + YubiKey

If you're still storing API keys in `.env` files or worse, in your shell history — stop. Right now.

**1Password** stores secrets encrypted, syncs across devices, and has a CLI (`op`) that integrates with your terminal:

```bash
# Instead of hardcoding secrets
export AWS_ACCESS_KEY_ID=$(op read "op://Dev/AWS/access-key-id")
export AWS_SECRET_ACCESS_KEY=$(op read "op://Dev/AWS/secret-access-key")
```

Add a **YubiKey** for hardware-backed 2FA on your critical accounts (GitHub, AWS, Google). Even if someone steals your password, they can't log in without the physical key.

```bash
# SSH with YubiKey (FIDO2 resident key)
ssh-keygen -t ed25519-sk -O resident -O verify-required
```

This generates an SSH key that *lives on the YubiKey*. You need to physically touch the key for every SSH connection. Paranoid? Maybe. But it means a compromised laptop can't silently SSH into your servers.

## Dev Isolation: Separate macOS User

This one is underrated. Create a second macOS user account for development:

- Your **main account** has your personal stuff, email, banking, photos
- Your **dev account** has your IDEs, Docker, node_modules, pip packages, and all the wild stuff you install for work

If a malicious npm package runs code during install, it can access everything in your user directory. With a separate dev user, the blast radius is contained. Your personal files, browser sessions, and credentials are in a different account entirely.

```bash
# Create a dev user
sudo dscl . -create /Users/dev
sudo dscl . -create /Users/dev UserShell /bin/zsh
sudo dscl . -create /Users/dev RealName "Dev Account"
sudo dscl . -create /Users/dev UniqueID 1001
sudo dscl . -create /Users/dev PrimaryGroupID 20
sudo createhomedir -c -u dev
```

Fast User Switching makes bouncing between accounts painless.

## High-Risk Code: VMs and Containers

Some code just shouldn't run on your host machine:

- Cloned repos from unknown contributors
- Security research / CTF challenges
- Legacy projects with outdated dependencies
- Anything that requires `sudo` and you're not 100% sure why

For quick isolation, Docker is fine:

```bash
# Run untrusted code in a disposable container
docker run --rm -it -v $(pwd):/code --network none python:3.12 bash
```

The `--network none` flag is key: the code can't call home.

For stronger isolation, use a VM. [OrbStack](https://orbstack.dev/) is excellent on Apple Silicon — fast Linux VMs that feel almost native:

```bash
# Create a disposable Ubuntu VM
orb create ubuntu:22.04 sandbox
orb shell sandbox
# Do your sketchy stuff here
orb delete sandbox  # poof, gone
```

## Endpoint Scanning: Loki-RS

[Loki](https://github.com/Neo23x0/Loki) is an IOC (Indicator of Compromise) scanner. It checks your system against known malware signatures, suspicious file names, and YARA rules. The Rust version (Loki-RS) is fast and works well on macOS.

Run it periodically or after installing something you're not 100% sure about:

```bash
# Scan your home directory
./loki -p /Users/acidjunk --intense
```

It won't catch zero-days, but it will catch known bad stuff that you might have accidentally downloaded or that snuck in through a supply chain attack.

## Logging and Telemetry

macOS has decent built-in logging (`log show`, `log stream`), but it's verbose and hard to parse. For meaningful security telemetry, consider:

**Unified log queries** for suspicious activity:

```bash
# Check for recent sudo usage
log show --predicate 'process == "sudo"' --last 24h

# Monitor process executions
log stream --predicate 'eventMessage contains "exec"' --level info
```

**osquery** for SQL-based system inspection:

```bash
brew install osquery

# What's listening on the network?
osqueryi "SELECT * FROM listening_ports WHERE address != '127.0.0.1';"

# Any suspicious launch daemons?
osqueryi "SELECT * FROM launchd WHERE run_at_load = 1;"
```

This isn't about building a SIEM. It's about being able to answer "what happened on my machine in the last 24 hours?" when something feels off.

## Browser Hygiene: Profiles per Trust Zone

Your browser is the biggest attack surface on your machine. Use separate profiles to compartmentalize:

- **Personal**: email, banking, social media (strict privacy extensions)
- **Work**: company tools, Slack, Jira (company-approved extensions only)  
- **Dev/Research**: Stack Overflow, GitHub, npm docs (relaxed but isolated)
- **Throwaway**: random links from chat, sketchy downloads (no logged-in accounts)

In Chrome/Firefox, profiles are completely isolated — different cookies, different extensions, different history. A compromised session in one profile can't access another.

```
Firefox tip: Use Firefox Multi-Account Containers for even more 
granular isolation within a single profile.
```

## The "I Don't Have Time" Minimum

If you only do three things from this list:

1. **Install Little Snitch** — know what's calling home
2. **Use 1Password for secrets** — stop putting keys in .env files
3. **Separate browser profiles** — don't browse sketchy links in the same browser where you're logged into AWS

That alone puts you ahead of 90% of developers.

## What This Doesn't Cover

This is a "secure-ish" setup, not a hardened government workstation. It doesn't protect against:

- A determined nation-state attacker (you have bigger problems)
- Physical access to your machine (use FileVault, obviously)
- Social engineering (no tool fixes human judgment)
- Zero-day exploits in macOS itself (keep your OS updated)

The goal isn't perfection. It's raising the cost of compromise high enough that attackers move on to easier targets. And trust me — there are plenty of easier targets than a developer running Little Snitch with a YubiKey.

Stay safe out there. 🔐
