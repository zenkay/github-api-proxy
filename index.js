'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

// Index of a repo
server.route({
    method: 'GET',
    path: '/repos',
    handler: function (request, reply) {
        reply('/repos');
    }
});

// Details about a repo
server.route({
    method: 'GET',
    path: '/repos/{id}',
    handler: function (request, reply) {
        reply('/repos/' + encodeURIComponent(request.params.id));
    }
});

// Search repo
server.route({
    method: 'GET',
    path: '/repos/search/{query}',
    handler: function (request, reply) {
        reply('/repos/search/' + encodeURIComponent(request.params.query));
    }
});

server.start((err) => {
    if (err) {throw err;}
    console.log(`Server running at: ${server.info.uri}`);
});
