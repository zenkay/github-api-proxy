const Github = require('../lib/github.js');
const github = new Github();

describe("getRepos", function () {
  it("return a list of public repos", function (done) {
    github.getRepos()
    .then(function(data){
      expect(repos).not.toBe(null);
      expect(repos.constructor.name).toBe("Array");
      done();
    })
    .catch(function() {
      done();
    })
  });
});

describe("getRepo", function () {
  it("return details of a given repository", function (done) {
    github.getRepo(1)
    .then(function(data){
      expect(repos).not.toBe(null);
      done();
    })
    .catch(function() {
      done();
    })
  });
});


describe("search", function () {
  it("return a list of public repos matching the query", function (done) {
    github.search("devise")
    .then(function(data){
      expect(repos).not.toBe(null);
      expect(repos.constructor.name).toBe("Array");
      done();
    })
    .catch(function() {
      done();
    })
  });
});
