const pg = require('pg');
const Sequelize = require('sequelize');
const connectDB = require('../config/db');


const ModelView = connectDB.define('categories',
    {
        name: {
            type: Sequelize.STRING
        },

        tool: {
            type: Sequelize.STRING
        },
        
        type: {
            type: Sequelize.STRING
        },
    },

);
module.exports = ModelView;