const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    nameCategory: {
        type: String,
        required: true,
        unique: true,
    },
    brands: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
        },
    ]
    ,
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
});

module.exports = mongoose.model('Category', categorySchema);
