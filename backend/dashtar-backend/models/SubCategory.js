const pg = require('pg');
const Sequelize = require('sequelize');
const connectDB = require('../config/db');


const SubCategory = connectDB.define('subcategories',  
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
  type:{
    type:Sequelize.STRING
  },
  category_id:{
    type:Sequelize.INTEGER
  },
  status: {
    type:Sequelize.INTEGER
  },
},
{
  timestamps:true,
}
);
module.exports = SubCategory;