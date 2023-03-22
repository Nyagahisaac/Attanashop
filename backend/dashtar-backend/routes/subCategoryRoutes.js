const express = require('express');
const router = express.Router();
const {
  addSubCategory,
  addAllSubCategory,
  upload,
  getAllSubCategory,
  getShowingSubCategory,
  getSubCategoryById,
  updateSubCategory,
  updateStatus,
  deleteSubCategory,
} = require('../controller/subCategoryController');

//add a subcategory
router.post('/add',upload, addSubCategory);

//add all subcategory
router.post('/all', addAllSubCategory);

//get only showing subcategory
router.get('/show', getShowingSubCategory);

//get all subcategory
router.get('/', getAllSubCategory);

//get a subcategory
router.get('/:id', getSubCategoryById);

//update a subcategory
router.put('/:id', updateSubCategory);

//show/hide a subcategory
router.put('/status/:id', updateStatus);

//delete a subcategory
router.delete('/:id', deleteSubCategory);

module.exports = router;
