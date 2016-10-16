# Github API Proxy

## Setup

This project was developed on Node.js v6.8.0. It has not be tested on other version but should work (I hope) on any recente version which supports ES6 syntax.

### Install Node.js

To install node v6.8.0 I recommend the [Node Version Manager](https://github.com/creationix/nvm). You can install it using the install script available on [Github README of the project](https://github.com/creationix/nvm/blob/master/README.markdown).

```
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
```

After succesfully installed nvm you can install your choosen version of Node.js

```
# nvm install v6.8.0
```

Then your Node.js installation should be ready.

```
# nvm use v6.8.0
Now using node v6.8.0 (npm v3.10.8)

# node -v
v6.8.0
```

### Install dependencies

To manage required libraries the project uses [npm](https://www.npmjs.com/) that should be installed together with Node.js. Simply run

```
npm install
```

and a long list of libraries and dependencies installed should appear.

All the libraries are saved locally into the ```node_modules``` directory.

## Usage

### Run server

### Run tests
