let instance = null;
const GitHubApi = require("github");

class Github {

  constructor() {
    if(!instance) {instance = this;}
    this.api = new GitHubApi({
      debug: true,
      followRedirects: false,
      timeout: 5000
    });
    return instance;
  }

  getRepos() {
    return this.api.repos.getPublic({});
  }

  getRepo(id) {
    return this.api.repos.getById({ "id": id });
  }

  search(query) {
    return this.api.search.repos({ "q": query });
  }

}

module.exports = Github
