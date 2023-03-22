const pg = require('pg');
const Category = require('../models/Category');
const multer = require('multer');
const path = require('path');


const addCategory = async  (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).send({
      message: 'Category Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllCategory = async  (req, res) => {
  try {
    const info = await Category(req.body);
    res.status(200).send({
      message: 'Category Added successfully!',
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



const getShowingCategory = async (req, res) => {
  try {
    const categories = await Category.find({ status: 1 }).sort({
      _id: -1,
    });
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({});
  
    res.send(categories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.send(category);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      category.name= req.body.parent;
      category.image= req.body.image;
     
      await category.save();
      res.send({ message: 'Category Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Category not found!' });
  }
};

  const updateStatus = (req, res, next) => {
    Category.update(req.body, {
      where : { id : req.params.id}
    }).then(function(category){
    res.json({
      status: 1,
      data: category
    })
  }).catch(next);
  };

  const deleteCategory = async (req, res) => {
    try{
  
      const Id = Number(req.params.id)
  
      Category.destroy({ where:{ id: Id }})
     
      res.status(200).send({
        message: 'Category Deleted Successfully!',
      })
    }
    catch(err) {
      
      res.status(400).send({
        message: err.message
  
      })
    }
  };

module.exports = {
  addCategory,
  addAllCategory,
  getAllCategory,
  getShowingCategory,
  getCategoryById,
  updateCategory,
  updateStatus,
  deleteCategory,
  upload
};
