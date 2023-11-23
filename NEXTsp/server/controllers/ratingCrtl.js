//rating controller
const RatingService = require('../services/ratingService');
const handleError = require('../middleware/errorHandling');

//
class RatingController {
    static async addRatingController(req, res) {
        try {
            const { userId, productId, rating, review } = req.body;
            const result = await RatingService.addRatingService(userId, productId, rating, review);
            res.status(200).json(result);
        } catch (err) {
            handleError(err, res);
        }
    }
    
}

module.exports = RatingController;
