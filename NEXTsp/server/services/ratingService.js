const Rating = require('../models/ratingModel');
const Product = require('../models/productModel');

class RatingService {
    static async addRatingService(userId, { productId, rating, review }) {
        try {
            // Validation
            if (!productId || !rating || !review) {
                throw {
                    status: 400,
                    message: 'Missing required fields for rating creation'
                };
            }
            // Check for duplicate rating
            const duplicateRating = await Rating.findOne({ productId, userId });
            if (duplicateRating) {
                throw {
                    status: 400,
                    message: 'You have already rated this product'
                };
            }
            // Create a new rating instance
            const newRating = new Rating({
                userId,
                productId,
                rating,
                review
            });
            // Save the new rating
            const savedRating = await newRating.save();

            // Update the product's rating
            const product = await Product.findById(productId);
            product.averageRating = (product.averageRating * product.numReviews + rating) / (product.numReviews + 1);
            product.numReviews += 1;
            await product.save();

            return {
                success: true,
                message: 'Rating created successfully',
                data: savedRating
            };
        } catch (err) {
            return {
                success: false,
                message: err.message
            };
        }
    }
}

module.exports = RatingService;