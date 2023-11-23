//rating controller
const RatingService = require('../services/ratingService');
const handleError = require('../middleware/errorHandling');

//
class RatingController {
    static async addRatingController(req, res) {
        try {
            const { productId, rating, review } = req.body;
            const userId = req.user._id;
            const result = await RatingService.addRatingService(userId, { productId, rating, review });
            if (!result.success) {
                return res.status(result.status).json({ message: result.message });
            }
            res.status(201).json({ message: result.message, data: result.data });
        } catch (err) {
            handleError(res, err);
        }
    }
}

module.exports = RatingController;
