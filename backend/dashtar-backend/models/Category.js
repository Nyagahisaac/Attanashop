const pg = require('pg');
const Sequelize = require('sequelize');
const connectDB = require('../config/db');


const Category = connectDB.define('categorytables',  
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
  
  name:{
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
module.exports = Category;