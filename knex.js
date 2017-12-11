const config = require('getconfig');
const knex = require('knex');

if (!config.DATABASE) {
  throw new Error('No Database Setting');
}

const database = knex(config.DATABASE);

module.exports = database;
