const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryCrtl');
//addcategory
router.post('/add', CategoryController.addCategoryController); // Assuming execute is the method to handle the route
//updatecategory
router.put('/update/:id', CategoryController.updateCategoryController); // Assuming execute is the method to handle the route
//deletecategory
router.delete('/delete/:id', CategoryController.deleteCategoryController); // Assuming execute is the method to handle the route
//getallcategory
router.get('/getall', CategoryController.getAllCategoriesController); // Assuming execute is the method to handle the route
module.exports = router;
