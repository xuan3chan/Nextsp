// productMode
// Product model
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        nameProduct: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        images: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true, //important
    }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;