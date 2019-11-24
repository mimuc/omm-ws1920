# Student provided Assignments.
Public repo for student-contributed solutions for the assignments (Online Multimedia @ LMU)

**We won't provide any solutions, only comments.** Please collaborate and discuss your own solutions and suggestions here.

## How to contribute ##
We assume you have git installed on your machine. If not, [download it](https://git-scm.com/) first.

### Step 1: Create a GitHub account ###
1. Create a GitHub account here: https://github.com/join - also, check
2. Create an SSH-key for your machine by executing `ssh-keygen` in either bash or Git-Bash.
Follow the instructions. It's not a bad idea to protect the key with a password, but it's not
absolutely necessary if you're on a private computer.
3. Copy the SSH-key that you find in `~/.ssh/id_rsa.pub`
4. Enter the SSH-key on GitHub, which will allow you to push code to repos for which you have access.
This is the URL to do that: https://github.com/settings/keys


### Step 2: Workspace Set-up
1. Clone this repository to your own machine. `git clone git@github.com:mimuc/omm-ws1920.git`
1. Fork the repository: https://github.com/mimuc/omm-ws1920#fork-destination-box (click the "Fork" Button)
1. Add the repository as remote origin: `git remote add myfork <YOUR_REPOSITORY_URL>`
1. Do this: `git pull myfork master`
1. Set the upstream branch to your own repo: `git branch -u myfork/master`
1. Add your code __ONLY__ to the `assignments/solutions` folder in the correct assignment subdirectory. It's best to create a new folder that starts with your name/initials.
1. Push your code to your own fork (`git push myfork`) and when you're happy with it, create a Pull Request (PR) on GitHub.

### Notes ###
- We will merge your repos as they are, but sometime we make small modifications or comments
- Make sure you keep your repository in sync with the origin like so `git pull origin master && git merge origin/master`.
Resolve any conflicts on your machine before pushing.
- It's probably best if you somehow prefix your folder names with your initials / name / alias. Like so: `DarkwingDuck-Assignment01`, `DarkwingDuck-Assignment02`... you get the idea
- you can (and should) comment and improve others' solutions. Just let them know if you do that.

## Help! ##
If you're stuck, don't worry. We'll help you either before/after the tutorials or on Slack:
https://mimuc.slack.com/messages/omm-ws1920


Happy hacking.