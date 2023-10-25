//catalog routes
const express = require('express');
const router = express.Router();
const CatalogController = require('../controllers/catalogCrtl');
router.get('/getlistcateandbrand', CatalogController.getAllCategoriesAndBrands);

module.exports = router;