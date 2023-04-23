const express = require('express');
const {
  getAllTours,
  addNewTour,
  getATour,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(addNewTour);
router.route('/:id').get(getATour);

module.exports = router;
