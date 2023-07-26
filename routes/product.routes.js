const { Router } = require("express");
const productRouter = Router();

// Importing product controller functions
const { create, getProductByCategoryId, getProductByProductId } = require("../controller/product.controller");

// Route for creating a new product
productRouter.post("/", create);

// Route for getting products by category
productRouter.get("/category/:categoryId", getProductByCategoryId);

// Route for getting product by ID
productRouter.get("/id/:productId", getProductByProductId);

// Export 
module.exports = {
  productRouter
};
