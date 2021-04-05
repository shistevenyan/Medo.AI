# Medo Playground
## Progress with Installing on WSL2

For the brave, the following guide may help: [https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2)

We were able to install NVM using the following `curl`-command within `git-bash.exe` (part of [Git for Windows](https://gitforwindows.org/)).
```
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```
You may receive error messages such as: `Failed to clone nvm repo. Please report this!`. Continue these steps to install NVM; a version code should appear.
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm --version
```
Lastly, errors were encountered when installing Node LTS:
```
$ nvm install --lts
Installing latest LTS version.
Can not determine how many core(s) are available, running in single-threaded mode.
Please report an issue on GitHub to help us make nvm run faster on your computer!
Local cache found: ${NVM_DIR}/.cache/src/node-v14.16.0/node-v14.16.0.tar.xz
Checksums match! Using existing downloaded archive ${NVM_DIR}/.cache/src/node-v14.16.0/node-v14.16.0.tar.xz
$>./configure --prefix=/c/Users/john/.nvm/versions/node/v14.16.0 <
./configure: line 7: /c/Users/john/AppData/Local/Microsoft/WindowsApps/python3: Permission denied
./configure: line 7: /c/Users/john/AppData/Local/Microsoft/WindowsApps/python3: Permission denied
nvm: install v14.16.0 failed!
```
Note: Cygwin was a non-starter.