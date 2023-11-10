// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productCrtl');
const uploader = require('../config/cloudinary.config');

// Routes for product operations
router.post('/add',uploader.array('images',10),ProductController.addProductController);
router.put('/update/:id',uploader.array('images',10), ProductController.updateProductController);
router.delete('/delete/:id', ProductController.deleteProductController);
router.get('/getdetails/:id', ProductController.getDetailsProductController);
router.get('/getall', ProductController.getAllProductsController);
router.get('/search/:nameProduct', ProductController.searchProductController);

module.exports = router;
