//oder controller
const orderService = require('../service/orderService');
const handleErrorResponse = require('../middleware/errorHandling');

class OrderController {
    //add new order
    async addOrder(req, res) {
        try {
            const { userId, product, totalPrice, tracking, payment,address,phone } = req.body;
            const result = await orderService.addOrder(userId, product, totalPrice, tracking, payment,address,phone);
            res.status(200).json({message : "add complet", order : result});
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
    //update order chỉ update trường tracking
    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const { tracking } = req.body;
            const result = await orderService.updateOrder(id, tracking);
            res.status(200).json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
    //delete order
    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const result = await orderService.deleteOrder(id);
            res.status(200).json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
    //get all order
    async getAllOrder(req, res) {
        try {
            const result = await orderService.getAllOrder();
            res.status(200).json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

}
module.exports = new OrderController();

