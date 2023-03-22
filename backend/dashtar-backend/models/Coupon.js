const pg = require('pg');
const Sequelize = require('sequelize'); 
const connectDB = require('../config/db');

const Coupons =connectDB.define('coupons',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.STRING
    },

    couponcode: {
      type: Sequelize.STRING
    },
    endtime: {
      type: Sequelize.DATE
    },
    discountpercentage: {
      type: Sequelize.INTEGER
    },
    minimumamount: {
      type: Sequelize.INTEGER
    },
    type: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: true,
  }
);


module.exports = {Coupons};
