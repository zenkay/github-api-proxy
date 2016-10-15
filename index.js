'use strict';

const TOKEN = "3722f439ebb2007c397fdbfa52e298d3d56ed5d9"

const Hapi = require('hapi');
const AuthBearer = require('hapi-auth-bearer-token');
const Github = require('./lib/github.js');

const github = new Github();
let server = new Hapi.Server();
server.connection({ port: 3000 });

server.register(AuthBearer, (err) => {

    // Set auth method
    server.auth.strategy('simple', 'bearer-access-token', {
        accessTokenName: 'access_token',
        validateFunc: function( token, callback ) {
            var request = this;
            if(token === TOKEN) {callback(null, true, { token: token })}
            else {callback(null, false, { token: token })}
        }
    });

    // Index of a repo
    server.route({
        method: 'GET',
        path: '/repos',
        config: { auth: 'simple' },
        handler: function (request, reply) {
            let results = github.getRepos();
            reply(results);
        }
    });

    // Details about a repo
    server.route({
        method: 'GET',
        path: '/repos/{id}',
        config: { auth: 'simple' },
        handler: function (request, reply) {
            let repo_id = encodeURIComponent(request.params.id)
            let result = github.getRepo(repo_id);
            reply(result);
        }
    });

    // Search repo
    server.route({
        method: 'GET',
        path: '/repos/search/{query}',
        config: { auth: 'simple' },
        handler: function (request, reply) {
            let query = encodeURIComponent(request.params.query)
            let results = github.search(query);
            reply(results);
        }
    });

    // Run server
    server.start((err) => {
        if (err) {throw err;}
        console.log(`Server running at: ${server.info.uri}`);
    });

});
