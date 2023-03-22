const pg = require('pg');
const Sequelize = require('sequelize');
const connectDB = require('../config/db');


const Tools = connectDB.define('tools',  
{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNUll:false,
    primaryKey:true
  },
  image:{
    type:Sequelize.STRING
  },
  
  subcategory_id:{
    type:Sequelize.INTEGER
  },
  tool:{
    type:Sequelize.STRING
  },
  status: {
    type:Sequelize.INTEGER
  },
},
{
  timestamps:true,
}
);
module.exports = Tools;