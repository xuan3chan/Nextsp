const Order = require('../models/Order');

class OrderService {
  //add new order and validate
  async addOrder(UserId, product, totalPrice, tracking, payment) {
    if (!UserId || !product || !totalPrice || !tracking || !payment) {
      throw new Error('Missing required fields');
    }
    const order = new Order({
      UserId,
      product,
      totalPrice,
      tracking,
      payment,
    });
    const saveOder=await order.save();
    return saveOder;;  
}
}

module.exports = OrderService;

