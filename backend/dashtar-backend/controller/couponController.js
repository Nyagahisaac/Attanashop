const {Coupons} = require('../models/Coupon');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const sequelize = require('sequelize'); 
const Sequelize = ('../config/db');
require("dotenv").config();
const  pg = require('pg');
const { title } = require('process');
const { json } = require('body-parser');
const { Console } = require('console');

const addCoupon = async (req, res) => {
  try {
    const newCoupon = new Coupons(req.body);
    await newCoupon.save();
    res.send({ message: 'Coupon Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addAllCoupon = async (req, res) => {
  try {
    await Coupons.inserMany(req.body);
    res.status(200).send({
      message: 'Coupon Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupon = await Coupons.findAll({
     
    });
   
    res.send(coupon);
   

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupons.findByPk(req.params.id);
    res.send(coupon);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupons.findByPk(req.params.id);
    if (coupon) {
      coupon.title = req.body.title;
      coupon.couponcode = req.body.couponcode;
      coupon.endtime = dayjs().utc().format(req.body.endtime);
      // Console.log(dayjs().utc().format(req.body.endtime));
      coupon.discountpercentage = req.body.discountpercentage;
      coupon.minimumamount = req.body.minimumamount;
      coupon.type = req.body.type;
      coupon.logo = req.body.logo;
      await coupon.save();
      res.send({ message: 'Coupon Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Coupon not found!' });
  }
  
};

const deleteCoupon = async (req, res) => {
  try{
  // console.log(req.params, typeof(req.params.id))
  const newId = Number(req.params.id)
  // console.log(newId, typeof(newId))
  const response = await Coupons.destroy({ where: { id: newId } })
  // console.log(response)
  res.status(200).json(response)
  }
  catch(e) {
    console.log(e)
    res.status(400).send({
      message: e.message
    })
  }

};

module.exports = {
  addCoupon,
  addAllCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
