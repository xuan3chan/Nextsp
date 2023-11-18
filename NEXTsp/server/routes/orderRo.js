//oder route
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderCrtl');
const verifyToken = require('../middleware/auth');

router.post('/add', orderController.addOrderController);
router.put('/update/:id', orderController.updateOrderController);
router.delete('/delete/:id', orderController.deleteOrderController);
router.get('/getall', orderController.getAllOrderController);
router.get('/getbyuser/:userId',verifyToken, orderController.getOrdersByUser);

module.exports = router;