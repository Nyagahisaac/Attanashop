const express = require('express');
const router = express.Router();
const {
    getAllModelView,
} = require('../controller/modelViewController');

router.get('/', getAllModelView);

module.exports = router;

