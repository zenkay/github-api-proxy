'use strict';

const frisby = require('frisby');

const TEST_DOMAIN = "http://localhost:3000"
const TOKEN = "3722f439ebb2007c397fdbfa52e298d3d56ed5d9"

frisby.create('Show repos index')
  .get(TEST_DOMAIN + '/repos?access_token=' + TOKEN)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Show repo details')
  .get(TEST_DOMAIN + '/repos/32375923?access_token=' + TOKEN)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Show results for text search')
  .get(TEST_DOMAIN + '/repos/search/devise?access_token=' + TOKEN)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();
