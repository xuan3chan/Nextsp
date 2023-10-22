// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productCrtl');
const upload = require('../middleware/multer');

// Routes for product operations
router.post('/add',upload.single('image'), ProductController.addProduct);
router.put('/update/:id',upload.single('image'), ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);
router.get('/details/:id', ProductController.getDetailsProduct);
router.get('/getAll', ProductController.getAllProducts);

module.exports = router;
