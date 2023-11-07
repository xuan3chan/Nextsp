// cart route 
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartCrtl');

router.post('/addCart', CartController.addProductToCartService);


router.put('/updateCart', CartController.updateProductInCartService);

module.exports = router;