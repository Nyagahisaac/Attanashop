const express = require('express');
const router = express.Router();
const {
  addBrand,
  addAllBrand,
  // upload,
  getAllBrand,
  getShowingBrand,
  getBrandById,
  updateBrand,
  updateStatus,
  deleteBrand,
} = require('../controller/brandController');

//add a Brand
router.post('/add', addBrand);

//add all Brand
router.post('/all', addAllBrand);

//get only showing Brand
router.get('/show', getShowingBrand);

//get all Brand
router.get('/', getAllBrand);

//get a Brand
router.get('/:id', getBrandById);

//update a Brand
router.put('/:id', updateBrand);

//show/hide a Brand
router.put('/status/:id', updateStatus);

//delete a Brand
router.delete('/:id', deleteBrand);

module.exports = router;

