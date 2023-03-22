const pg = require('pg');
const Brand = require('../models/Brands');
const multer = require("multer");
const path = require('path');

const addBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();
    res.status(200).send({
      message: 'Brand Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllBrand = async (req, res) => {
  try {
    await Brand.insertMany(req.body);
    res.status(200).send({
      message: 'Brand Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingBrand = async (req, res) => {
  try {
    const brand = await Brand.find({ status: 'Show' }).sort({
      id: id
    });
    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllBrand = async (req, res) => {
  try {
    const brand = await Brand.findAll({
    
    });
    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (brand) {

      brand.brandname = req.body.brandname;
      brand.image = req.body.image

      await brand.save();
      res.send({ message: 'Brand Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Brand not found!' });
  }
};

const updateStatus = (req, res, next) => {
  Brand.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function(brand) {
    res.json({
      status: "show",
      data: brand,
      message: 'Brand Status Updated Successfully!'
    })
  }).catch(next);
};


const deleteBrand = async (req, res) => {
  try{

    const Id = Number(req.params.id)

    Brand.destroy({ where:{ id: Id }})
   
    res.status(200).send({
      message: 'Brand Deleted Successfully!',
    })
  }
  catch(err) {
    
    res.status(400).send({
      message: err.message

    })
  }
};
module.exports = {
  addBrand,
  addAllBrand,
  getAllBrand,
  getShowingBrand,
  getBrandById,
  updateBrand,
  updateStatus,
  deleteBrand,
};