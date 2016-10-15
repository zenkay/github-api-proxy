'use strict';

const Repository = require("./repository.js");

class SearchedRepository extends Repository {
  constructor(id, name, description) {
    super(id, name)
    this.description = description;
  }
}

module.exports = SearchedRepository;
