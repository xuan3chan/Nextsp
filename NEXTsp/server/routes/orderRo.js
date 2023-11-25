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
router.get('/searchorder/:id', orderController.searchOrderController);
router.get('/statisticinyear/:year', orderController.statisticsOrderInYearController);
router.get('/statisticinmonth/:year/:month', orderController.statisticsOrderInMonthController);


module.exports = router;