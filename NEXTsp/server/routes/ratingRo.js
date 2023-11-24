const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/ratingCrtl');

router.post('/add', RatingController.addRatingController);
router.get('/getrating/:productId', RatingController.getRatingByProductIdController);

module.exports = router;