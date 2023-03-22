const bcrypt = require('bcryptjs');
const pg = require('pg');
const Sequelize = require('sequelize'); 
const connectDB = require('../config/db');


    const users = connectDB.define(
        'users',
        {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
          },
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },

    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      required: false,
      default: bcrypt.hashSync('12345678'),
    },
    role: {
      type: Sequelize.STRING,
    },
    joiningdata: {
      type: Sequelize.DATE,
      required: false,
    },
  },
  {
    timestamps: true,
  },
        {
            schema: 'public',
        }
    )
    // return users
    module.exports = users;