const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryCrtl');
//addcategory
router.post('/add', CategoryController.addCategory); // Assuming execute is the method to handle the route
//updatecategory
router.put('/update/:id', CategoryController.updateCategory); // Assuming execute is the method to handle the route
//deletecategory
router.delete('/delete/:id', CategoryController.deleteCategory); // Assuming execute is the method to handle the route
//getallcategory
router.get('/getall', CategoryController.getAllCategories); // Assuming execute is the method to handle the route
module.exports = router;
