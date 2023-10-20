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
