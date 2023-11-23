//oder controller
const orderService = require("../services/orderService");

const handleErrorResponse = require("../middleware/errorHandling");

class OrderController {
  //add new order
  async addOrderController(req, res) {
    try {
      const { userId, product, tracking, payment, address, phone, fullName } =
        req.body;
      const result = await orderService.addOrderService(
        userId,
        product,
        tracking,
        payment,
        address,
        phone,
        fullName
      );
      res.status(200).json({ message: "add complete", order: result });
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
  async getOrdersByUser(req, res) {
    try {
      const userId = req.params.userId;
      const orders = await orderService.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
  //search order by id
  async searchOrderController(req, res) {
    try {
      const { id } = req.params;
      const result = await orderService.searchOrderService(id);
      res.status(200).json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}
module.exports = new OrderController();
