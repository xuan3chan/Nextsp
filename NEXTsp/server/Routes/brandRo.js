const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryCrtl');
//addcategory
router.post('/addcategory', CategoryController.addCategory); // Assuming execute is the method to handle the route
//updatecategory
router.put('/updatecategory/:id', CategoryController.updateCategory); // Assuming execute is the method to handle the route
//deletecategory
router.delete('/deletecategory/:id', CategoryController.deleteCategory); // Assuming execute is the method to handle the route
//getallcategory
router.get('/getallcategory', CategoryController.getallCategories); // Assuming execute is the method to handle the route
module.exports = router;
const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brandCrtl');
//addbrand
router.post('/addbrand', BrandController.addBrand); // Assuming execute is the method to handle the route
//updatebrand
router.put('/updatebrand/:id', BrandController.updateBrand); // Assuming execute is the method to handle the route
//deletebrand
router.delete('/deletebrand/:id', BrandController.deleteBrand); // Assuming execute is the method to handle the route
//getallbrands
router.get('/getallbrands', BrandController.getallBrands); // Assuming execute is the method to handle the route
module.exports = router;
