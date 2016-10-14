'use strict';

const Hapi = require('hapi');
var GitHubApi = require("github");

var github = new GitHubApi({
    debug: true,
    followRedirects: false,
    timeout: 5000
});

const server = new Hapi.Server();
server.connection({ port: 3000 });

// Index of a repo
server.route({
    method: 'GET',
    path: '/repos',
    handler: function (request, reply) {
        let results = github.repos.getPublic({});
        reply(results);
    }
});

// Details about a repo
server.route({
    method: 'GET',
    path: '/repos/{id}',
    handler: function (request, reply) {
        let repo_id = encodeURIComponent(request.params.id)
        let result = github.repos.getById({"id": repo_id});
        reply(result);
    }
});

// Search repo
server.route({
    method: 'GET',
    path: '/repos/search/{query}',
    handler: function (request, reply) {
        let query = encodeURIComponent(request.params.query)
        let results = github.search.repos({ "q": query });
        reply(results);
    }
});

server.start((err) => {
    if (err) {throw err;}
    console.log(`Server running at: ${server.info.uri}`);
});
