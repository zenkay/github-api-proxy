'use strict';

const SearchedRepository = require("./searched_repository.js");

class DetailedRepository extends SearchedRepository {
  constructor(id, name, description, pushed_at, created_at, updated_at, user) {
    super(id, name, description)
    this.pushed_at = pushed_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user = user;
  }
}

module.exports = DetailedRepository;
