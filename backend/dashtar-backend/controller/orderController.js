const Orders = require('../models/Order');
const Sequelize = require('sequelize');
const connectDB = require('../config/db');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({

    });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await Orders.findByPk(req.params.id);
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateOrder = (req, res, next) => {
  Orders.update(req.body, {
    where : { id : req.params.id}
  }).then(function(order){
  res.json({
    status: 'Pending',
    data: order
  })
}).catch(next);
};

const deleteOrder = (req, res) => {
  Order.deleteOne({ id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Order Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  updateOrder,
  deleteOrder,
};
