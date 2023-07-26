const { Router } = require("express");

const {
  addToCart,
  updateQuantity,
  getAllDataFromCart,
  deleteItem,
} = require("../controller/cart.controller");
const cartRouter = Router();

// Route  for all data
cartRouter.get("/", getAllDataFromCart);

// Route for add product to cart
cartRouter.post("/:productId", addToCart);

// Route for update quantity
cartRouter.patch("/:productId", updateQuantity);


// Route for removing item from cart
cartRouter.delete("/:productId", deleteItem);

module.exports = {
  cartRouter,
};
