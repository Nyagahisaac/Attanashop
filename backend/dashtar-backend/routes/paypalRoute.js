const express = require('express');
const router = express.Router();
const { paypalPayment } = require('../controller/paypal');

//get all orders
router.post('/add', paypalPayment);



module.exports = router;
