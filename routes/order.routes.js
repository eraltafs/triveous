const { Router } = require("express");
const orderRouter = Router();

const { order, getOrderHistory, getOrderDetails } = require("../controller/order.contoller");

// const { authenticate } = require("../middleware/authentication");

// place order
orderRouter.post("/:productId", order);
orderRouter.get("/", getOrderHistory)
orderRouter.get("/:orderId", getOrderDetails)


// exports
module.exports = {
  orderRouter,
};
