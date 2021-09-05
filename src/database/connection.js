const knex = require('knex')
const dataBaseConfig = require('./knexfile')

const dataBaseConnection = knex(dataBaseConfig)

module.exports = { dataBaseConnection }