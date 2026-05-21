---
title: 'Move a React component to a npm module'
date: '2021-03-20 01:15'
author: 'acidjunk'
category: 'Computerz'
tags: ["Computerz","javascript","git","tutorial"]
thumbnail: '/images/thumbnails/react.jpg'
status: 'published'
---

React is a great way to write reusable components which can be used to create complex but responsive GUI's and SPA's.
But how do you move complexer components to separate installable npm modules? Especially when the component uses a
lot of dependencies like SASS or UI toolkits like Bootstrap, Material design or Elastic UI?

This blog post describes a way to extract a component that uses Typescript and Elastic UI + SASS to a separate repo
and use it in a create-react-app context. After experimenting a but with babel to transpile the component to ES5 I
found the process a bit too complex; especially when using typescript + SASS. You could probably also use a complete
create-react-app based app with webpack to publish the component, but I decided to give rollup a try. To make it
interesting, we'll add support for testing the component, and we will use storybook to present a demo of the
component, which can be published with gh-pages.

## Peer dependencies, and the development experience

Peer dependencies are a specific kind of dependencies really useful for reusable modules:

- Ask user to install a dependency your module needs to work without specifying a version in particular
- Prevents having multiple version of a same module in user's app node_modules
- Reduce javascript files size to load on browser side particularly useful for mobile users

The problem with peer dependencies is npm and yarn don't install them at all. This is the right behavior for
production purpose but when you are developing you might need to test your module in a host app. npm and yarn provide
a command to achieve it called link that basically creates a symlink into the host app node_modules to your module
source folder. It works fine but you also need to execute tasks in your module that needs these dependencies. For
example, you might want to execute tests. Since they aren't present in your module's node_modules you will experience
errors like this:

```
Cannot find module 'react' from 'index.js'
```

yarn and npm don't provide tools to install peer dependencies for your development environment.

To solve this you could use the `prepare` functionality from yarn and the package `install-peers-cli`.
install-peers-cli is a CLI that automatically installs peer dependencies of a package. It should be called after the
dependencies are installed. Fortunately prepare is called after dependencies installation and only when you are
developing so it won't install the peer dependencies when a user installs your module.

As a modern javascript stack consists out a lot of stuff and you're probably using React + some way to style your
components, SASS compilers, typescript config; some boilerplate is needed. Our goal is not alone a stand alone
component but it should be possible to relatively easily work on the component with a hot-reloading example page.
Publishing an example page to gh-pages to have easy accesible docs and yest based tests is also quite handy.

Couple of options for the boilerplate:

1. My own (fork); with a very basic roll up, typescript + storybook en yest setup:
https://github.com/acidjunk/react-component-library-starter

2. A fancier version, with lots of documentation and examples of how to include Sass based workflows and Material
design or Elastic UI without bloating the distribution bundle:

https://www.npmjs.com/package/create-react-library

> The remainder of this blog post will focus on the latter as I was working on a timeboxed ticket to come up with a
> solution to extract a page of the orchestrator GUI into an npm installable package

## Create-react-library

This is a great little library: after installing the CLI, you can start a new component library with a wizard; and it
will setup all the boilerplate and a decent project structure for this kind of component development.

The result actually consists out of 2 subprojects; one is responsible for the distribution of your component(s). The
other subproject ensures you can serve your component from a small example project. The example project links itself
to the dependencies of the distribution project and best of all; auto hot reloading also works. So you can do changes
in the SASS stylesheet of your component and the example page wil (auto)reload with the changes after the
distribution is rebuild.

Working on the component just involves a `yarn start` from the project folder and a `yarn start` from the `examples/`
folder. Stuff that you import in your component will be available in the build and it uses three-shaking; so the
resulting files will be small; only the parts that you actually used of libraries will be automatically included in
the build.

You can see it in action here.

![project-structure.png](/images/posts/move-a-react-component-to-a-npm-module/project-structure.png)

The bottom left terminal is running the distribution build, which auto reloads when files changes are detected. When
it's done compiling/transpiling the right bottom terminal will notice the changes in the build and it will reload the
example webpage in your browser.

In the end the SCSS part was the most difficult: I couldn't get the scss to autocompile to css upon changes. Luckily
WebStorm can do it for you with a file watcher and the resulting css is automatically bundled into the distributions
css.

So there you have it; an easy way to work on you own components; even when you are using complex UI toolkits like
Material UI ot Elastic UI.
