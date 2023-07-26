const { Router } = require("express");
const orderRouter = Router();

const { order } = require("../controller/order.contoller");

// const { authenticate } = require("../middleware/authentication");

// place order
orderRouter.post("/:productId", order);

// exports
module.exports = {
  orderRouter,
};
