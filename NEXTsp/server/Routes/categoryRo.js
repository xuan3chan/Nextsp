const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryCrtl');
//addcategory
router.post('/addcategory', CategoryController.addCategory); // Assuming execute is the method to handle the route
//updatecategory
router.put('/updatecategory/:id', CategoryController.updateCategory); // Assuming execute is the method to handle the route
//deletecategory
router.delete('/deletecategory/:id', CategoryController.deleteCategory); // Assuming execute is the method to handle the route
module.exports = router;
