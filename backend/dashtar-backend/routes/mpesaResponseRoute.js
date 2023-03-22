const express = require('express');
const router = express.Router();
const { lipaNaMpesaOnlineResponse } = require('../controller/mpesaResponse');

//get all orders
router.post('/add', lipaNaMpesaOnlineResponse);



module.exports = router;
