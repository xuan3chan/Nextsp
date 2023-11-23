//rating model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    ratingStart: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    },
    review: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;