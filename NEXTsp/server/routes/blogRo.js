const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogCrtl');
const uploader = require('../config/cloudinary.config');

// Routes for product operations
router.post('/add',uploader.array('images',10),BlogController.addBlogController);
router.put('/update/:id',uploader.array('images',10), BlogController.updateBlogController);
router.delete('/delete/:id', BlogController.deleteBlogController);
router.get('/getall', BlogController.getAllBlogsController);
router.get('/search/:title', BlogController.searchBlogController);

module.exports = router;
