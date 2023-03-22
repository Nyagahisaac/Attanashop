const pg = require('pg');
const Sequelize = require('sequelize'); 
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');


    const Admins = connectDB.define('admins',
   
     
        {
         id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
     
    },
           name: {
      type: Sequelize.STRING
      
    },
     image: {
       type: Sequelize.STRING
    },
   

    email: {
      type: Sequelize.STRING
      
    },
    phone: {
      type: Sequelize.STRING
    
    },
    password: {
      type: Sequelize.STRING,
       default: bcrypt.hashSync('12345678'),
    },
    role: {
      type: Sequelize.STRING
      
    },
    joiningdate: {
      type: Sequelize.DATE
    },
  },
      {
    timestamps: true,
  }
  );
 

  module.exports = {Admins};

