let instance = null;
const GitHubApi = require("github");
const User = require("./user.js");
const Repository = require("./repository.js");
const SearchedRepository = require("./searched_repository.js");
const DetailedRepository = require("./detailed_repository.js");

class Github {

  constructor() {
    if(!instance) {instance = this;}
    this.api = new GitHubApi({
      // debug: true,
      followRedirects: false,
      timeout: 5000
    });
    return instance;
  }

  getRepos() {
    return this.api.repos.getPublic({})
      .then(function(repos) {
        // messy code, refactor in a functional way
        let result = []
        for (let repo of repos) {
          result.push(new Repository(repo.id, repo.name));
        }
        return result
      })
      .catch(function(err) {
        return { err }
      });
  }

  getRepo(id) {
    return this.api.repos.getById({ "id": id })
      .then(function(r) {
        return new DetailedRepository(
          r.id,
          r.name,
          r.description,
          r.pushed_at,
          r.created_at,
          r.updated_at,
          new User(r.owner.id, r.owner.login)
        )
      })
      .catch(function(err) {
        return { err }
      });
  }

  search(query) {
    return this.api.search.repos({ "q": query })
      .then(function(repos) {
        // messy code, refactor in a functional way
        let result = []
        for (let repo of repos.items) {
          result.push(new SearchedRepository(repo.id, repo.name, repo.description));
        }
        return result
      })
      .catch(function(err) {
        return { err }
      });
  }

}

module.exports = Github
