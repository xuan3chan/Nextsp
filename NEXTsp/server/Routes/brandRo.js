const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brandCrtl');
//addbrand
router.post('/add', BrandController.addBrand); // Assuming execute is the method to handle the route
//updatebrand
router.put('/update/:id', BrandController.updateBrand); // Assuming execute is the method to handle the route
//deletebrand
router.delete('/delete/:id', BrandController.deleteBrand); // Assuming execute is the method to handle the route
//getallbrands
router.get('/getall', BrandController.getAllBrands); // Assuming execute is the method to handle the route
//getbrandbyid
router.get('/get/:id', BrandController.getBrandByIdWithCategory); // Assuming execute is the method to handle the rout
module.exports = router;
