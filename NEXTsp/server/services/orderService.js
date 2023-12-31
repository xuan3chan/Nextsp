const Order = require("../models/orderModel");
const Product = require("../models/productModel");

class OrderService {
  //add new order and validate
  async addOrderService(
    userId,
    product,
    tracking,
    payment,
    address,
    phone,
    fullName
  ) {
    if (
      !userId ||
      !product ||
      !tracking ||
      !payment ||
      !address ||
      !phone ||
      !fullName
    ) {
      throw new Error("Missing required fields");
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
      throw new Error("Missing required fields");
    }
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    order.tracking = tracking;
    const saveOder = await order.save();
    return saveOder;
  }
  //delete order
  async deleteOrderService(id) {
    if (!id) {
      throw new Error("Missing required fields");
    }
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    const result = await Order.findByIdAndDelete(id);
    return result;
  }
  //get all order populate product and user
  async getAllOrderService() {
    const result = await Order.find()
      .populate({ path: "product.productId", select: "nameProduct price" })
      .populate({ path: "userId", select: "fullName email accountName" });

    // Function to format date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    // Format the createdAt date for each order
    const ordersWithFormattedDate = result.map(order => ({
      ...order._doc,
      createdAt: formatDate(order.createdAt)
    }));

    return { success: true, message: "all order", order: ordersWithFormattedDate };
  }
  async getOrdersByUserId(userId) {
    const orders = await Order.find({ userId: userId })
      .populate("userId")
      .populate("product.productId");
    return orders;
  }
  //search order by id
  async searchOrderService(id) {
    if (!id) {
      throw new Error("Missing required fields");
    }
    const order = await Order.findById(id)
      .populate({ path: "product.productId", select: "nameProduct price images" })
      .populate({ path: "userId", select: "fullName email accountName" });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }
  //12 tháng
  async statisticsOrderInYearService(year) {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return { success: false, message: "No order in this year" };
    }

    return { success: true, message: "Statistics order in 12 month",months:result };
  }
//statistics order 31 day in 1 month 
  async statisticsOrderInMonthService(year, month) {
    // Convert year and month to numbers and adjust month for JavaScript's 0-based month index
    year = Number(year);
    month = Number(month) - 1;

    const startDate = new Date(year, month);
    const endDate = new Date(year, month + 1);

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: 1 },
        },
      },
    ]);

    if (result.length === 0) {
      return { success: false, message: "No order in this month" };
    }

    return { success: true, message: "Statistics order in this month", days: result };
  }
}

 
module.exports = new OrderService();
