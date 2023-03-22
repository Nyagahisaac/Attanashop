const pg = require('pg');

const Sequelize = require('sequelize'); 
const connectDB = require('../config/db');

const Orders = connectDB.define("orders",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
     
    },
    firstname: {
      type: Sequelize.STRING,
      // required: false,
    },
    lastname: {
     type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
      // required: true,
    },
    country: {
      type: Sequelize.STRING,
      required: true,
    },
    street: {
      type: Sequelize.STRING,
      // required: false,
    },
    address: {
     type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
      // required: true,
    },
    state: {
      type: Sequelize.STRING,
      required: true,
    },
    zip: {
      type: Sequelize.STRING,
      // required: false,
    },
    phone: {
     type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      // required: true,
    },
    total: {
      type: Sequelize.INTEGER,     
    },
    
    status: {
      type: Sequelize.STRING,
      enum: ['Pending', 'Processing', 'Delivered'],
    },
  },
  {
    timestamps: true,
  }
);

// const Order =
//   Sequelize.Model.Order ||
//   Sequelize.Model(
//     'Orders',
//     order.plugin(AutoIncrement, {
//       inc_field: 'invoice',
//       start_seq: 10000,
//     })
//   );
module.exports = Orders;
