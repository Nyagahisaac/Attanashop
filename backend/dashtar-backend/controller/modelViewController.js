const pg = require('pg');
const ModelView = require('../models/ModelView');
const multer = require("multer");
const path = require('path');


  
  const getAllModelView = async (req, res) => {
    try {
      const modelView = await ModelView.findAll({
      
      });
      res.send(modelView);
    } catch (err) {
      res.status(500).send({
        message: err.message,
        // message: "mashida"
        
      });
    }
  };

  module.exports = {
   getAllModelView
  };