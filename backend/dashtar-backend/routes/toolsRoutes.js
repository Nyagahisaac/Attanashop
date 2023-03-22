const express = require('express');
const router = express.Router();
const {
  addTools,
  addAllTools,
  upload,
  getAllTools,
  getShowingTools,
  getToolsById,
  updateTools,
  updateStatus,
  deleteTools,
} = require('../controller/toolsController');

//add a tools
router.post('/add',upload, addTools);

//add all tools
router.post('/all', addAllTools);

//get only showing tools
router.get('/show', getShowingTools);

//get all tools
router.get('/', getAllTools);

//get a tools
router.get('/:id', getToolsById);

//update a tools
router.put('/:id', updateTools);

//show/hide a tools
router.put('/status/:id', updateStatus);

//delete a tools
router.delete('/:id', deleteTools);

module.exports = router;
