---
title: 'Working with git submodules'
date: '2023-10-15 18:55'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","git"]
thumbnail: '/images/thumbnails/git.png'
status: 'published'
---

During the split of the [orchestrator-gui](https://github.com/workfloworchestrator/orchestrator-core-gui) into a
public part, covered by the Apache 2 license and a, closed src, SURF specific part we decided to use git submodules
for it. The idea: we will have 2 projects that depend on each other and we want to be able to make versioned changes
in both.

I think that `git submodules` are a feature that can be very handy for projects that use an internal library that. Of
course this also depends on the used programming language. If packaging a lib is easy enough you'll probably want to use
that. Though when projects grow, this agnostic way of managing multiple version repo's and their relationships is
really powerful.

In this article I won't do a very detailed dive into submodules. You can read a very long version
[here](https://git-scm.com/book/en/v2/Git-Tools-Submodules), but instead I will focus on some often used commands
that cover some often used scenario's like switching between the branches of the main and the sub projects. It's
meant to help you with day-to-day operation.

## Start a new submodule integration

You start the relation by adding a submodule to your main project:

```bash
git submodule add https://github.com/acidjunk/some-cool-library
```

By default, submodules will add the subproject into a directory named the same as the repository, in this case
“some-cool-library”. You can add a different path at the end of the command if you want it to go elsewhere.

In the main repo a new file is now created: `.gitmodules` which keeps track of the version of the used submodule. This
file keep track of the foldername for your submodule and it's remote github URL. When both projects are in the same
git repo domain you use relative paths.

Another change can be observed in the repo. The folder that contains the submodule is now also under version control,
but git only shows you the commit SHA1 of the branch inside the folder.

`$ git diff --cached some-cool-library`

output:
```
diff --git a/some-cool-library b/some-cool-library
new file mode 160000
index 0000000..c3f01dc
--- /dev/null
+++ b/DbConnector
@@ -0,0 +1 @@
+Subproject commit de1dc8862123d317dd46284b05b6892c7b2a23
```

When you now commit the code you will see that the file mode will be 160000 for the `some-cool-library` folder. That
is a special mode in Git that basically means you’re recording a commit as a directory entry rather than a
subdirectory or a file.

## Cloning a Project with Submodules

We’ll clone a project with a submodule in it. When you clone such a project, by default you get the directories that
contain submodules, but none of the files within them yet, so to "completely" get the code on your local device:

```bash
git clone git@github.com:workfloworchestrator/orchestrator-ui-library.git
git submodule init
git submodule update
```

If you later decide that you want to bring the submodule in sync with the rmeote again:

```bash
git submodule update --remote
```

## Some tips and tricks to make live easier when you use submodules a lot

Working with git submodules can be powerful but also complex. Here are several tips and tricks to make your life easier when using git submodules extensively:

### 1. Cloning Repositories with submodules
When you clone a repository that contains submodules, the submodules will initially be empty. Use `git clone --recurse-submodules` to clone the repository and all of its submodules at once. If you've already cloned the repository, you can use `git submodule update --init --recursive` to fetch and update the submodules.

### 2. Simplify submodule commands with an alias
If you find yourself repeatedly typing long submodule commands, consider adding aliases to your `.gitconfig` file. For example, you can add an alias like `update-submodules = submodule update --init --recursive` to simplify the submodule update process.

### 3. Check submodule status easily
Use `git submodule status` to quickly check the status of all submodules. This will show you the commit each submodule is currently checked out at, along with any modifications.

### 4. Working on a submodule
When you need to make changes within a submodule, treat it like any other repository: make changes, commit them, and push. However, remember to go back to the parent repository to commit the change in the submodule reference. This ensures that others will get the correct submodule state when they update.

### 5. Avoid hardcoding submodule URLs
If you're working in a team or across various environments, consider using relative URLs for your submodules in the `.gitmodules` file. This makes it easier to work with different forks or mirrors of the main project and its submodules.

### 6. Handling submodule branches
If you work with submodules that need to track certain branches, you can specify a branch in the `.gitmodules` file by adding `branch = your-branch-name` under the relevant submodule section. Remember to run `git submodule update --remote` to fetch changes from the tracked branch.

### 7. Use `git diff` with submodules
To see changes in submodules, you can use `git diff --submodule`. This will show you a diff of what's changed in each submodule.

### 8. Automate submodule syncing
Ensure that your submodule URLs are always up to date with `git submodule sync`. This command updates the URLs of the submodules to match what's specified in the `.gitmodules` file, which is useful if the submodule URLs have changed.

### 9. Utilize Git Hooks
Automate some of your submodule workflows with Git hooks. For example, you can create a post-checkout hook that runs `git submodule update --init --recursive` every time you checkout a branch, ensuring that your submodules are always in the correct state.

Mastering git submodules requires patience and practice. These tips and tricks can help streamline your workflow, making it easier to manage projects that depend on submodules.

Happy coding!
