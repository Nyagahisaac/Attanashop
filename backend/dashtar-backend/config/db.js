
require('dotenv').config();
const pg = require('pg');
const Sequelize = require('sequelize');


module.exports = new Sequelize ('test','isaac','2facebaby', {
  host: 'localhost',
  dialect: 'postgres',
  operatersAliases: false,

  pool : {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000
  },
}) ;


