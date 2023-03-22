const express = require('express');
const router = express.Router();
const {
  lipaNaMpesaOnline
} = require('../controller/mpesa');

//get all orders
router.post('/add', lipaNaMpesaOnline);



module.exports = router;
