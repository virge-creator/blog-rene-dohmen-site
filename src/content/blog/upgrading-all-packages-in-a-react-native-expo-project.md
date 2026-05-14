---
title: 'Upgrading all packages in a React Native Expo project'
date: '2021-03-15 01:15'
author: 'undefined'
category: 'Computerz'
tags: ["Computerz","javascript","linux","git"]
thumbnail: '/images/thumbnails/react.jpg'
status: 'published'
---

When you're working with an Expo managed React Native app upgrading is relatively easy, but it can be a bit daunting as
lot's of dependencies are used. In general the upgrade consists out of upgrading the expo stuff and upgrading the
packages that are not actively managed by Expo. In my experience the upgraded project will also be faster to build.
E.g. an Expo SDK 40.0 build is faster than the SDK 39.0 build.

> Note: please commit stuff after changes so you'll have a way to revert stuff if you encounter breaking changes in
some of the deps.

1. Upgrade Expo CLI
The Expo CLI will do the most of the work upgrading the app, so update it.

```bash
yarn add --dev expo-cli@latest
```

2. Upgrade Expo and Known Packages
Expo CLI can upgrade Expo and all packages that it knows about, respecting Expo’s specific version requirements.
`expo upgrade` updates the version numbers in `package.json` and installs them afterwards to keep the `yarn.lock` in
sync.

```bash
yarn expo upgrade
```

Make a note of the packages that weren’t upgraded by Expo. You should check the READMEs for those deps to determine
what version is compatible with your new set of packages.

3. Upgrade the Rest of the Packages
Upgrade the rest of the deps.

```bash
yarn upgrade
```

4. Major Upgrades
yarn upgrade doesn’t upgrade packages to new major versions. Verify if there is anything not up to date, and if so, consider upgrading. Upgrading major versions might require a lot of changes to the source code.

# Look out of major updates to unknown packages, that is red
# lines where the package is in the list found in step 1.
yarn outdated
5. Sync Versions from yarn.lock
I like being able to see the exact version of the packages that I have installed. syntcyarnlock can synchronize the versions from yarn.lock to package.json. Reinstall afterwords to write the updated version numbers back to yarn.lock, keeping the the file in sync with package.json.

npx syncyarnlock --keepPrefix --keepGit --keepLink --save
# Revert the change to the "react-native" line in package.json before installing.
yarn install
syncyarnlock should not change the version of react-native away from Expo’s specific one, but there seems to be a bug. Revert that line in package.json if is was modified. It should look like this:

{
// ...
"dependencies": {
// ...
"react-native": "https://github.com/expo/react-native/archive/sdk-37.0.1.tar.gz",
// ...
}
// ...
}
6. Align @types Packages
Definitely Typed packages don’t always follow the versioning of the main packages, so there are a few @types packages where this simply isn’t possible. When not, I grab the lastet @types package available.

Align the @types/ packages with the ones installed. Example: If react is on version 16.9.0 and @types/react is on version 16.8.something, I manually update @types/react to version ~16.9.0. The tilde will make sure to grab the latest 16.9.* version. Search for react-native@ in yarn.lock to finde the installed version of React Native.

This will require yet another around of installing, upgrading and sync’ing version numbers.

# Update @types packages manually.
yarn install
npx syncyarnlock --keepPrefix --keepGit --keepLink --save
# Revert the change to the "react-native" line in package.json before installing.
yarn install && yarn upgrade
Expo
upgrading Expo
upgrading Node packages
Yarn
