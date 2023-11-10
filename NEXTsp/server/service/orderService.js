const Order = require('../models/orderModel');

class OrderService {
  //add new order and validate
  async addOrder(userId, product, totalPrice, tracking, payment,address,phone) {
    if (!userId || !product || !totalPrice || !tracking || !payment || !address || !phone) {
      throw new Error('Missing required fields');
    }
    const order = new Order({
      userId,
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
    if (!id) {
        throw new Error('Missing required fields');
    }
    const order = await Order.findById(id);
    if (!order) {
        throw new Error('Order not found');
    }
    const result = await Order.findByIdAndDelete(id);
    return result;    
}
//get all order populate product and user
async getAllOrder() {
    const result = await Order.find().populate({ path: 'product.productId', select: 'nameProduct price' }).populate({path:'userId',select:'fullName email accountName'});
    return result;

  }
}
module.exports = new OrderService();

