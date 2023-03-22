const pg = require('pg');
const SubCategory = require('../models/SubCategory');
const multer = require('multer');
const path = require('path');


const addSubCategory = async  (req, res) => {
  try {
    const newSubCategory = new SubCategory(req.body);
    await newSubCategory.save();
    res.status(200).send({
      message: 'SubCategory Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllSubCategory = async  (req, res) => {
  try {
    const info = await SubCategory(req.body);
    res.status(200).send({
      message: 'SubCategory Added successfully!',
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



const getShowingSubCategory = async (req, res) => {
  try {
    const categories = await SubCategory.find({ status: 1 }).sort({
      _id: -1,
    });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllSubCategory = async (req, res) => {
  try {
    const categories = await SubCategory.findAll({});
  
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const subcategory = await SubCategory.findByPk(req.params.id);
    res.send(subcategory);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const subcategory = await SubCategory.findByPk(req.params.id);
    if (subcategory) {
      subcategory.type = req.body.type;
      subcategory.image= req.body.image;
      subcategory.category_id= req.body.category_id;
      await subcategory.save();
      res.send({ message: 'SubCategory Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'SubCategory not found!' });
  }
};

  const updateStatus = (req, res, next) => {
    SubCategory.update(req.body, {
      where : { id : req.params.id}
    }).then(function(subcategory){
    res.json({
      status: 1,
      data: subcategory
    })
  }).catch(next);
  };


  const deleteSubCategory = async (req, res) => {
    try{
  
      const Id = Number(req.params.id)
  
      subcategory.destroy({ where:{ id: Id }})
     
      res.status(200).send({
        message: 'SubCategory Deleted Successfully!',
      })
    }
    catch(err) {
      
      res.status(400).send({
        message: err.message
  
      })
    }
  };

  


module.exports = {
  addSubCategory,
  addAllSubCategory,
  getAllSubCategory,
  getShowingSubCategory,
  getSubCategoryById,
  updateSubCategory,
  updateStatus,
  deleteSubCategory,
  upload
};
