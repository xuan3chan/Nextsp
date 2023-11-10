const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    tracking:
    {
        type: String,
        enum: ['pending','confirmed','shipping', 'delivered','done','cancel'],
        default: 'pending',
    },
    payment: {
        type: String,
        enum: ['COD', 'banking'],
        default: 'COD',
    },
});

module.exports = mongoose.model('Cart', CartSchema);