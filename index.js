'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

// Index of a repo
server.route({
    method: 'GET',
    path: '/repos',
    handler: function (request, reply) {
        reply(
            [
                {
                    "id" : 1296269 ,
                    "name" : "Hello-World"
                }
            ]
        );
    }
});

// Details about a repo
server.route({
    method: 'GET',
    path: '/repos/{id}',
    handler: function (request, reply) {
        reply(
            {
                "id" : 1296269 ,
                "user" : {
                    "login" : "octocat" ,
                    "id" : 1 ,
                    },
                "name" : "Hello-World" ,
                "description" : "This your first repo!" ,
                "pushed_at" : "2011-01-26T19:06:43Z" ,
                "created_at" : "2011-01-26T19:01:12Z" ,
                "updated_at" : "2011-01-26T19:14:43Z" ,
            }
        );
    }
});

// Search repo
server.route({
    method: 'GET',
    path: '/repos/search/{query}',
    handler: function (request, reply) {
        reply(
            [
                {
                    "id" : 1296269 ,
                    "name" : "Hello-World" ,
                    "description" : "this is your first repo!" ,
                }
            ]
        );
    }
});

server.start((err) => {
    if (err) {throw err;}
    console.log(`Server running at: ${server.info.uri}`);
});
