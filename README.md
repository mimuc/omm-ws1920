# _Online Multimedia - Winter Semester 2019/2020_

In this repository you can find materials for the Online Multimedia lecture
at LMU Munich in the Winter Semester 2019/2020.

The lecture is targeted at Informatics and Media Informatics Master students.
For more details, see the [course website](http://www.medien.ifi.lmu.de/lehre/ws1920/omm/).

## Required Toolkit

To do the Break-Out exercises during the tutorials and to complete all assignments, make sure to install these tools *as soon as possible*.

- Text Editor / Web IDE *- choose one -*
  - [VS Code](https://code.visualstudio.com/download)
  - [Atom](https://atom.io/)
  - [Sublime](https://www.sublimetext.com/)
  - WebStorm (Students are eligible for a [free version](https://www.jetbrains.com/shop/eform/students))

- Git. On Windows you need to install git from [https://git-scm.com/](https://git-scm.com/). It's already included on macOS and Linux. On Mac you might want to install the [XCode Command Line Tools](http://railsapps.github.io/xcode-command-line-tools.html) to make sure you get the latest version.
    - After you're all set with git, go straight ahead to [this tutorial](https://rogerdudler.github.io/git-guide/), if you don't know git.
    - Watch [this video](https://www.youtube.com/watch?v=Y9XZQO1n_7c) to get you all up and running with git.
    - We recommend generating an SSH key and cloning this repository via SSH.
    - [This article](https://chris.beams.io/posts/git-commit/) is also a recommended read when working with git.

- NodeJS (+ npm). https://nodejs.org/en/.
    - MacOS: preferably via [Homebrew](https://brew.sh/) (or MacPorts if you already have that).  The package from the NodeJS website also works.
    - Linux: the package in the repos are often a bit outdated, so please look for other ways to get the latest stable version
    - Windows: the version from the NodeJS website should work.
- Once you have npm running (check via `npm -v`), install these packages (you can do all that from the Git-Bash):
  - Express Generator: `npm install -g express-generator`

- MongoDB. Follow the [installation instructions](https://docs.mongodb.com/manual/installation/).

- Docker. Fllow the [installation instructions](https://docs.docker.com/install/).

## Repository Structure

### `/assignments`

Everything related to the assignments goes here.

#### `/solutions`
**Commit your own solutions in the `solutions` sub-directories.** 
Read the [README](https://github.com/mimuc/omm-ws1920/tree/master/assignments/solutions) first to find out how to do this. There won't be official solutions from our side.

### `/tutorials`
all example code of the tutorials, break out material and other documents are here.
