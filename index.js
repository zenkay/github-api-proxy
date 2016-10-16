'use strict';

const TOKEN = "3722f439ebb2007c397fdbfa52e298d3d56ed5d9"
const CACHE_TTL = 300000

const Hapi = require('hapi');
const AuthBearer = require('hapi-auth-bearer-token');
const Cache = require('memory-cache');

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
      let cached_data = Cache.get('/repos')
      if(cached_data == undefined) {
        let results = github.getRepos();
        Cache.put('/repos', results, CACHE_TTL)
        reply(results);
      } else {
        reply(cached_data);
      }
    }
  });

  // Details about a repo
  server.route({
    method: 'GET',
    path: '/repos/{id}',
    config: { auth: 'simple' },
    handler: function (request, reply) {
      let repo_id = encodeURIComponent(request.params.id)
      let cached_data = Cache.get('/repos' + repo_id)
      if(cached_data == undefined) {
        let result = github.getRepo(repo_id);
        Cache.put('/repos' + repo_id, result, CACHE_TTL)
        reply(result);
      } else {
        reply(cached_data);
      }
    }
  });

  // Search repo
  server.route({
    method: 'GET',
    path: '/repos/search/{query}',
    config: { auth: 'simple' },
    handler: function (request, reply) {
      let query = encodeURIComponent(request.params.query)
      let cached_data = Cache.get('/repos/search/' + query)
      if(cached_data == undefined) {
        let results = github.search(query);
        Cache.put('/repos/search/' + query, results, CACHE_TTL)
        reply(results);
      } else {
        reply(cached_data);
      }
    }
  });

  // Run server
  server.start((err) => {
    if (err) {throw err;}
    console.log(`Server running at: ${server.info.uri}`);
  });

});
