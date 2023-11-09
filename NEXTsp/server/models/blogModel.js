const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter title'],
        },
        description: {
            type: String,
            required: [true, 'Please enter description'],
        },
        content: {
            type: String,
            required: [true, 'Please enter content'],
        },
        images: {
            type: String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0TtsaFZ8FBGJpFJ7gRnQesjehIx_mxF1Tfw_-ur-&s',
        },
    }, {
    timestamps: true,
    // timeseries: true,

}
);

const post = mongoose.model('post', blogSchema);
module.exports = post;