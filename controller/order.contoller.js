const { OrderModel } = require("../models/order.model");
const { CartModel } = require("../models/cart.model");
//  get all  orders
const getOrderHistory = async (req, res) => {
  const { userId } = req.user;

  try {
    const orders = await OrderModel.find({ userId });

    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching order history" });
  }
};
// get specific product
const getOrderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the specific order by its ID
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching order details" });
  }
};

// Place order
const order = async (req, res) => {
  const { userId } = req.user;
  const { productId } = req.params;

  try {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart is not found" });
    }

    // Calculate the total amount for the order
    let totalAmount = 0;
    for (const item of cart.items) {
      if (item.productId == productId) {
        totalAmount += item.price;
      }
    }

    // Create a new order with the items that are not being deleted

    const newOrderItems = cart.items.filter(
      (item) => item.productId == productId
    );
    const newOrder = new OrderModel({
      userId,
      items: newOrderItems,
      totalAmount,
    });
    await newOrder.save();

    // Remove the item from the cart
    cart.totalPrice = 0;
    cart.items = cart.items.filter((item) => {
      if (item.productId != productId) {
        cart.totalPrice += item.quantity * item.price;
      }
      return item.productId != productId;
    });
    await cart.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Getting error while ordering something" });
  }
};

// exports
module.exports = {
  order,
  getOrderHistory,
  getOrderDetails,
};
