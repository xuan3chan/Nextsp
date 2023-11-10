//oder route
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderCrtl');

router.post('/add', orderController.addOrder);
router.put('/update/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteOrder);
router.get('/getall', orderController.getAllOrder);

module.exports = router;