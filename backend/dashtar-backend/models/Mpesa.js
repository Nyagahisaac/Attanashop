const pg = require('pg');
const Sequelize = require('sequelize');
const connectDB = require('../config/db');


const Mpesa = connectDB.define('mpesas',  
{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNUll:false,
    primaryKey:true
  },

  CheckoutRequestID:{
    type:Sequelize.STRING
  },

},
{
  timestamps:true,
}
);
module.exports = Mpesa;