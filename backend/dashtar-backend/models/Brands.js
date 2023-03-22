const pg = require('pg');
const Sequelize = require('sequelize');
const connectDB = require('../config/db');


const Brand = connectDB.define('brands',  
{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNUll:false,
    primaryKey:true
  },

  brandname:{
    type:Sequelize.STRING
  },

  image: {
    type: Sequelize.STRING
  },
 
   status: {
      type: Sequelize.STRING,
      default: 'Show',
      enum: ['Show', 'Hide'],
    },
},
{
  timestamps:true,
}
);
module.exports = Brand;