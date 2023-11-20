const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema(
    {
        nameBrand: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        }],
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active',
        },
        brandSlug: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
