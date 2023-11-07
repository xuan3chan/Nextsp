const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less then 1.']
            },
            priceOfCase : {
                type: Number,
            },

        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);