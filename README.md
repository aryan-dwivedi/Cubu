# Cubu

## Table of Contents

- [Cubu](#cubu)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Running the application](#running-the-application)
    - [For Web](#for-web)
    - [For iOS](#for-ios)
    - [For Android](#for-android)
  - [Commiting the code](#commiting-the-code)
  - [Creating new and independent packages](#creating-new-and-independent-packages)
  - [Most common errors](#most-common-errors)
  - [Solutions](#solutions)
  - [Tips](#tips)

## Prerequisites

- Follow the instructions from the [React Native Dev Env Setup](https://reactnative.dev/docs/0.64/environment-setup#installing-dependencies)
- You need to install `git-cz` globally for when you commit the code.

```bash
yarn global add git-cz
```

Or

```bash
npm i -g git-cz
```

## Getting Started

Run the following command to install all the dependencies in the right location

```bash
yarn
yarn core:build:w
```

This will build the files in the `core` directory and it will be ready to use. All changes to the files in the `core` directory will be "watched" and those changes will be reflected wherever these files are being consumed.

## Running the application

### For Web

```bash
yarn web:dev
```

### For iOS

```bash

yarn ios
```

### For Android

```bash
yarn android
```

## Commiting the code

This repository follows commit guidelines provided by commitizen. To verify the installation of commitizen, you can run `git cz`.

After staging the files that you have changed, instead of using `git commit`, use `git cz`. This will give you an interactive shell with the help of which you can draft your commit message.

## Creating new and independent packages

In order to create a new and independent package(**NOT** inside `packages` directory) which is managed inside the monorepo, do the following:

- Add the name of the independent folder inside the `workspaces` field at the root level `package.json` and in the `packages` field in `lerna.json`.
- To create module inside the new independent package, run the following command:

```bash
yarn lerna create <name-of-module> [name-of-independent-package]
```

Note: The independent packages in this folder are:

- `packages`
- `linters`

Check `package.json` and `lerna.json` for reference to the above.

## Most common errors

- Version mistmatches in `package.json` in all the packages. All the dependencies should have the same verison
- Android builds might fail because of gradle versions
- `tried to synchronously call function from a different thread`
- `config["reactNativePath"] not working`
- Emulator process not killed (Windows)
- Application Building Issues for android
- Release build application crash on iOS

## Solutions

- Make all versions the same and use lerna to manage the installation of `node_modules`
- Do the following in case of failed builds:
  - Go to `android/gradle/wrapper/gradle-wrapper.properties`, and change the value of `distributionUrl` to `https\://services.gradle.org/distributions/gradle-6.7.1-bin.zip` like this `distributionUrl=https\://services.gradle.org/distributions/gradle-6.7.1-bin.zip`
  - Download JDK 11 and set your `$JAVA_HOME` variable to JDK 11
- Refer to [yarn-workspaces-reanimated](https://github.com/nikolaigeorgie/yarn-workspaces-reanimated) repository for the setup
- Follow [this](https://github.com/facebook/react-native/issues/29371#issuecomment-658523434) solution
- `taskkill /F /IM "qemu-system-x86_64.exe" /T`
- Fix `node_modules` paths in `project.ext.rect` inside `app/build.gradle`
- Add `#ifdef DEBUG` before `#ifdef FB_SONARKIT_ENABLED` on line 7 and 30.

## Tips

- To get a list of emulators; run this command: `emulator -list-avds`
- To increase performance of emulator; run this command:

```bash
emulator -gpu host -feature HVF -avd <name-of-avd-from-list>
```

- If you want to change the JDK version in android studio: [answer for this](https://stackoverflow.com/a/67414820/7879090)
