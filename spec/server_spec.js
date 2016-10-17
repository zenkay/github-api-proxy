'use strict';

const frisby = require('frisby');

const TEST_DOMAIN = "http://localhost:3000"
const TOKEN = "3722f439ebb2007c397fdbfa52e298d3d56ed5d9"

frisby.create('Server respond 404 on non existen endpoint')
  .get(TEST_DOMAIN + '/')
  .expectStatus(404)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    statusCode: 404,
    error: "Not Found"
  })
  .expectJSONTypes({
    statusCode: Number,
    error: String
  })
.toss();

frisby.create('Repos index reject if not authorized')
  .get(TEST_DOMAIN + '/repos')
  .expectStatus(401)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    statusCode: 401,
    error: "Unauthorized",
    message: "Missing authentication"
  })
  .expectJSONTypes({
    statusCode: Number,
    error: String,
    message: String
  })
.toss();

frisby.create('Repos index show a list of public repos')
  .get(TEST_DOMAIN + '/repos?access_token=' + TOKEN)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
    id: Number,
    name: String
  })
.toss();

frisby.create('Repo detail reject if not authorized')
  .get(TEST_DOMAIN + '/repos/32375923')
  .expectStatus(401)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    statusCode: 401,
    error: "Unauthorized",
    message: "Missing authentication"
  })
  .expectJSONTypes({
    statusCode: Number,
    error: String,
    message: String
  })
.toss();

frisby.create('Repo details show information about the repo')
  .get(TEST_DOMAIN + '/repos/32375923?access_token=' + TOKEN)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
    id: Number,
    name: String,
    description: String,
    pushed_at: Date,
    created_at: Date,
    updated_at: Date,
    user: {
      login: String,
      id: Number
    }
  })
.toss();

frisby.create('Repo details respond with a JSON error on non existen repo')
  .get(TEST_DOMAIN + '/repos/igbeicsd?access_token=' + TOKEN)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    err: {
      code: 404,
      status: "Not Found"
    }
  })
  .expectJSONTypes({
    err: {
      code: Number,
      status: String
    }
  })
.toss();

frisby.create('Search reject if not authorized')
  .get(TEST_DOMAIN + '/repos/search/devise')
  .expectStatus(401)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    statusCode: 401,
    error: "Unauthorized",
    message: "Missing authentication"
  })
  .expectJSONTypes({
    statusCode: Number,
    error: String,
    message: String
  })
.toss();

frisby.create('Search show results for text search')
  .get(TEST_DOMAIN + '/repos/search/devise?access_token=' + TOKEN)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
    id: Number,
    name: String,
    description: String
  })
.toss();

frisby.create('Search show empty array for empty result')
  .get(TEST_DOMAIN + '/repos/search/wenkfs?access_token=' + TOKEN)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONLength(0)
.toss();
