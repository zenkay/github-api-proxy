var frisby = require('frisby');

TEST_DOMAIN = "http://localhost:3000"

frisby.create('Show repos index')
  .get(TEST_DOMAIN + '/repos')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Show repo details')
  .get(TEST_DOMAIN + '/repos/32375923')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Show results for text search')
  .get(TEST_DOMAIN + '/repos/search/devise')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
.toss();
