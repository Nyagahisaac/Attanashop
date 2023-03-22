const pg = require('pg');
const Sequelize = require('sequelize'); 
const connectDB = require('../config/db');


    const Products = connectDB.define('products',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    
    sku: {
      type: Sequelize.STRING,
      required: false,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING,
    },
    unit: {
     type: Sequelize.STRING,
    },
    parent: {
      type: Sequelize.STRING,
    },
    brand: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    originalprice: {
     type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.INTEGER,
      
    },
    discount: {
      type: Sequelize.STRING,
      required: true,
      default: 0,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },

    description: {
      type: Sequelize.STRING,
    },
    children: {
     type: Sequelize.STRING,
    },
    tag: {
      type: Sequelize.STRING,
    },

  
    status: {
      type: Sequelize.INTEGER,
      
    },
  },

  {
    timestamps: true,
  }
);


module.exports = Products;
