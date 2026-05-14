---
title: 'Working with git submodules'
date: '2026-05-14 12:00'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","git","cheatsheet","devops"]
thumbnail: '/images/thumbnails/git.png'
status: 'published'
---

Git submodules are one of those features that are incredibly powerful — until they're not. I've been using them extensively since we split the [orchestrator-gui](https://github.com/workfloworchestrator/orchestrator-core-gui) into a public Apache 2 licensed part and a closed-source SURF-specific part. Two projects, tightly coupled, both under version control, needing versioned changes together.

Over the years I've collected enough scars (and shortcuts) to write this guide. It covers the basics, the daily workflow, and ends with a **cheat sheet** for when you just need to get stuff done without thinking.

## Why submodules?

If packaging a library is easy in your language (npm, pip, cargo), you probably want to do that instead. But when projects grow and you need to:

- Share code between repos without publishing packages
- Pin exact versions of dependencies across projects
- Work on library + consumer simultaneously

...then submodules are a solid, language-agnostic solution. The official [Git docs](https://git-scm.com/book/en/v2/Git-Tools-Submodules) go deep, but this article focuses on **day-to-day operations**.

## Adding a submodule

```bash
git submodule add https://github.com/acidjunk/some-cool-library
```

This creates a `.gitmodules` file tracking the submodule's folder name and remote URL. The submodule folder itself is recorded as a special `160000` mode entry — Git tracks the *commit SHA*, not the files.

```
diff --git a/some-cool-library b/some-cool-library
new file mode 160000
+Subproject commit de1dc8862123d317dd46284b05b6892c7b2a23
```

Use relative URLs in `.gitmodules` when both repos live on the same host — makes it easier for forks and mirrors.

## Cloning a project with submodules

When you clone a repo with submodules, the submodule directories are empty by default. Fix that in one go:

```bash
git clone --recurse-submodules git@github.com:org/project.git
```

Already cloned? No problem:

```bash
git submodule update --init --recursive
```

To pull the latest changes from the submodule's remote:

```bash
git submodule update --remote
```

## Daily workflow tips

### Check submodule status

```bash
git submodule status
```

Shows the current commit for each submodule and whether it's modified.

### Working inside a submodule

Treat it like any normal repo: make changes, commit, push. Then go back to the parent repo and commit the updated submodule reference:

```bash
cd some-cool-library
# make changes, commit, push
cd ..
git add some-cool-library
git commit -m "Update submodule to latest"
```

### Track a specific branch

Add to `.gitmodules`:

```ini
[submodule "some-cool-library"]
    path = some-cool-library
    url = https://github.com/acidjunk/some-cool-library
    branch = develop
```

Then fetch with `git submodule update --remote`.

### See what changed in submodules

```bash
git diff --submodule
```

### Keep URLs in sync

If submodule URLs change (moved repo, new fork):

```bash
git submodule sync
git submodule update --init --recursive
```

### Automate with Git hooks

Create a `.git/hooks/post-checkout` hook:

```bash
#!/bin/sh
git submodule update --init --recursive
```

This ensures submodules are always in the correct state after switching branches.

### Useful aliases

Add these to your `~/.gitconfig`:

```ini
[alias]
    supdate = submodule update --init --recursive
    spull = !git pull && git submodule update --init --recursive
    sdiff = diff --submodule
```

Now `git spull` pulls the main repo AND updates all submodules in one command.

## Cheat sheet: switch branches without submodule drama

This is the one you'll come back to. When you need to switch branches and want everything — main repo and all submodules — to be exactly in sync with the remote, no questions asked:

### 1. Fetch everything

```bash
git fetch --all --recurse-submodules
```

### 2. Switch branch

```bash
git checkout main
```

### 3. Hard reset main repo + all submodules

```bash
git reset --hard origin/main
git submodule update --init --recursive --force
```

### What this gives you

- Your main repo is exactly at `origin/main`
- Each submodule is checked out at the commit recorded in that branch
- No local submodule changes remain
- No "modified content" or "new commits" noise in `git status`

This is the nuclear option — it wipes all local changes. Use it when you just want a clean state and don't care about uncommitted work.

### The safe version

If you want to stash local changes first:

```bash
git stash --include-untracked
git fetch --all --recurse-submodules
git checkout main
git reset --hard origin/main
git submodule update --init --recursive --force
git stash pop  # get your local changes back
```

## Common gotchas

**"Submodule has modified content"**: You accidentally made changes inside a submodule directory. Either commit them (in the submodule) or discard with `git submodule update --force`.

**Detached HEAD in submodule**: This is normal! Submodules check out a specific commit, not a branch. If you need to work on it, `cd` into the submodule and `git checkout develop` (or whatever branch you need).

**CI/CD forgets submodules**: Most CI systems don't recurse submodules by default. In GitHub Actions:

```yaml
- uses: actions/checkout@v4
  with:
    submodules: recursive
```

**Nested submodules**: Yes, submodules can contain submodules. Always use `--recursive` flags to handle the full tree.

## Final thoughts

Submodules aren't perfect — they add complexity and can confuse team members who aren't familiar with them. But for the right use case (shared libraries, multi-repo architectures, licensing splits), they're the best tool Git offers natively.

The cheat sheet above is what I use daily. Print it, bookmark it, alias it. Happy coding!
