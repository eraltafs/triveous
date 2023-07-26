const mongoose = require("mongoose");

// schema
const orderSchema = mongoose.Schema({
  userId: {
    type: "ObjectId",
    required: true,
  },
  items: [
    {
      productId: {
        type: "ObjectId",
        ref: "users",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
  },
  orderData: {
    type: Date,
    default: Date.now,
  },
});

// model
const OrderModel = mongoose.model("orders", orderSchema);

// exports
module.exports = {
  OrderModel,
};
