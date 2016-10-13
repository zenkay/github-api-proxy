var frisby = require('frisby');

frisby.create('Show repos index')
  .get('http://localhost:3000/repos')
  .expectStatus(200)
  .toss();

frisby.create('Show repo details')
  .get('http://localhost:3000/repos/32375923')
  .expectStatus(200)
  .toss();

frisby.create('Show results for text search')
  .get('http://localhost:3000/repos/search/devise')
  .expectStatus(200)
  .toss();
