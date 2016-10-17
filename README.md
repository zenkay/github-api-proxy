# Github API Proxy

## Setup

This project was developed on Node.js v6.8.0. It has not be tested on other version but should work (I hope) on any recent version which supports ES6 syntax.

First of all checkout the code from this repository than follow the instructions below.

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
# npm install
```

and a long list of libraries and dependencies installed should appear.

All the libraries are saved locally into the ```node_modules``` directory.

## Usage

When both Node.js and the required libraries are installed the project should be ready to run.

### Run server

To start the server simply run

```
# node index.js
```

and the project start answer at http://localhost:3000

For development purpose is better to use something that reload the server after each update. I personally use ```nodemon```

```
# nodemon index.js
```

### GET endpoints

3 endpoint are available:

- ```/repos``` list some public repositories
- ```/repos/:id``` show details about a given repo
- ```/repos/search/:query``` list repo matching a given string

To access to any endpoint you need an access token passed as GET parameter statically set to ```3722f439ebb2007c397fdbfa52e298d3d56ed5d9```

Here is some example.

**/repos**

```
# curl http://localhost:3000/repos\?access_token\=3722f439ebb2007c397fdbfa52e298d3d56ed5d9
```

**/repos/1**

```
# curl http://localhost:3000/repos/1\?access_token\=3722f439ebb2007c397fdbfa52e298d3d56ed5d9
```

**/repos/search/devise**

```
# curl http://localhost:3000/repos/search/devise\?access_token\=3722f439ebb2007c397fdbfa52e298d3d56ed5d9
```

### Run tests

Tests are made using [Jasmine](http://jasmine.github.io/) and [Frisby.js](http://frisbyjs.com/). You can run the test suite with

```
# jasmine-node spec
```

N.B. Your server needs to be running when you run tests.

## Project structure

The API is based on [hapi](http://hapijs.com/).

```index.js``` implements endpoints logic and use [hapi-auth-bearer-token](https://github.com/johnbrett/hapi-auth-bearer-token) to handle authorization. Is not the best available solution but is easy to implement and extends. Probably a better solution would implement OAuth protocol.

Caching is implemented in memory using [memory-cache](https://github.com/ptarjan/node-cache). I suppose it doesn't scale but works really well and doesn't require external storage like Redis or Memcache.

```lib/github.js``` implement a wrapper to [node-github](https://mikedeboer.github.io/node-github/) and handle data format manipulation using object defined into other classes inside ```lib```. It also chatches connection errors with Github.

```spec/server_spec.js```implements tests for API endpoints.

```spec/github_spec.js```implements tests for Github class.










