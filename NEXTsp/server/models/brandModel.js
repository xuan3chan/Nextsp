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
        categoryid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            required: true,
            validate: {
                validator: function (value) {
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: 'Invalid categoryid',
            },
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active',
        },
    },
    {
        timestamps: true, // important
    }
);

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
