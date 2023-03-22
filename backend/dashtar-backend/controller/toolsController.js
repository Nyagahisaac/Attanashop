const pg = require('pg');
const Tools = require('../models/Tools');
const multer = require('multer');
const path = require('path');


const addTools = async  (req, res) => {
  try {
    const newTools = new Tools(req.body);
    await newTools.save();
    res.status(200).send({
      message: 'Tools Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllTools = async  (req, res) => {
  try {
    const info = await Tools(req.body);
    res.status(200).send({
      message: 'Tools Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


//upload images controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))


    if (mimeType && extname) {
      return cb(null, true)
    }
    cb('Provide proper file format to upload')
  }
}).single('image')



const getShowingTools = async (req, res) => {
  try {
    const tools = await Tools.find({ status: 1 }).sort({
      id: -1,
    });
    res.send(tools);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllTools = async (req, res) => {
  try {
    const tools = await Tools.findAll({});
  
    res.send(tools);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getToolsById = async (req, res) => {
  try {
    const tools = await Tools.findByPk(req.params.id);
    res.send(tools);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateTools = async (req, res) => {
  try {
    const tools = await Tools.findByPk(req.params.id);
    if (tools) {
     
      tools.image= req.body.image;
      tools.tool = req.body.tool;
      tools.subcategory_id = req.body.subcategory_id;
      await tools.save();
      res.send({ message: 'Tools Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Tools not found!' });
  }
};

  const updateStatus = (req, res, next) => {
    Tools.update(req.body, {
      where : { id : req.params.id}
    }).then(function(tools){
    res.json({
      status: 1,
      data: tools
    })
  }).catch(next);
  };

  const deleteTools = async (req, res) => {
    try{
  
      const Id = Number(req.params.id)
  
      tools.destroy({ where:{ id: Id }})
     
      res.status(200).send({
        message: 'Tools Deleted Successfully!',
      })
    }
    catch(err) {
      
      res.status(400).send({
        message: err.message
  
      })
    }
  };

module.exports = {
  addTools,
  addAllTools,
  getAllTools,
  getShowingTools,
  getToolsById,
  updateTools,
  updateStatus,
  deleteTools,
  upload
};
