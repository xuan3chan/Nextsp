// model brand 
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
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, //important
    }
);