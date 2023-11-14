//oder controller
const orderService = require('../service/orderService');
const handleErrorResponse = require('../middleware/errorHandling');

class OrderController {
    //add new order
    async addOrderController(req, res) {
        try {
            const { userId, product, totalPrice, tracking, payment,address,phone,fullName } = req.body;
            const result = await orderService.addOrderService(userId, product, totalPrice, tracking, payment,address,phone,fullName);
            res.status(200).json({message : "add complet", order : result});
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
    //update order chỉ update trường tracking
    async updateOrderController(req, res) {
        try {
            const { id } = req.params;
            const { tracking } = req.body;
            const result = await orderService.updateOrderService(id, tracking);
            res.status(200).json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
    //delete order
    async deleteOrderController(req, res) {
        try {
            const { id } = req.params;
            const result = await orderService.deleteOrderService(id);
            res.status(200).json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
    //get all order
    async getAllOrderController(req, res) {
        try {
            const result = await orderService.getAllOrderService();
            res.status(200).json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

}
module.exports = new OrderController();

