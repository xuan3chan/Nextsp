const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  tracking: {
    type: String,
    enum: ["pending", "confirmed", "shipping", "delivered", "done", "cancel"],
    default: "pending",
  },
  fullName: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    enum: ["COD", "Banking"],
    default: "COD",
  },
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);