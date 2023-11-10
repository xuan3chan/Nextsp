const Order = require('../models/orderModel');

class OrderService {
  //add new order and validate
  async addOrder(UserId, product, totalPrice, tracking, payment) {
    if (!UserId || !product || !totalPrice || !tracking || !payment || !address || !phone) {
      throw new Error('Missing required fields');
    }
    const order = new Order({
      UserId,
      product,
      totalPrice,
      tracking,
      payment,
      address,
      phone,

    });
    const saveOder=await order.save();
    return saveOder;;  
}
//update order chỉ update trường tracking
async updateOrder(id, tracking) {
  if (!id || !tracking) {
    throw new Error('Missing required fields');
  }
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }
  order.tracking = tracking;
  const saveOder=await order.save();
  return saveOder;

}
//delete order
async deleteOrder(id) {

    const result = await Order.findByIdAndDelete(id);
    if (!result) {
      return false;
    }
    return true;
}
//get all order
async getAllOrder() {
    const result = await Order.find();
    return result;
}

}
module.exports = OrderService;

