// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productCrtl');
const uploader = require('../config/cloudinary.config');
const productservice = require('../service/productService');

// Routes for product operations
router.post('/add',uploader.array('images',10),ProductController.addProduct);
router.put('/update/:id',uploader.array('images',10), ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);
router.get('/details/:id', ProductController.getDetailsProduct);
router.get('/getAll', ProductController.getAllProducts);

module.exports = router;
