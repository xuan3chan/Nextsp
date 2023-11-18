const Order = require('../models/orderModel');

class OrderService {
  //add new order and validate
  async addOrderService(userId, product, tracking, payment, address, phone, fullName) {
    if (!userId || !product || !tracking || !payment || !address || !phone || !fullName) {
      throw new Error('Missing required fields');
    }

    // Calculate total price
    let totalPrice = 0;
    for (let i = 0; i < product.length; i++) {
      const prod = await Product.findById(product[i].productId);
      totalPrice += prod.price * product[i].quantity;
    }

    const order = new Order({
      userId,
      product,
      totalPrice,
      tracking,
      payment,
      address,
      phone,
      fullName,
    });

    const saveOrder = await order.save();
    return saveOrder;
  }
//update order chỉ update trường tracking
async updateOrderService(id, tracking) {
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
async deleteOrderService(id) {
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
async getAllOrderService() {
    const result = await Order.find().populate({ path: 'product.productId', select: 'nameProduct price' }).populate({path:'userId',select:'fullName email accountName'});
    return{ success: true, message: 'all order', order: result };  ;

  }
}
module.exports = new OrderService();

