const { CartModel } = require("../models/cart.model");
const {ProductModel}=require("../models/product.model")

// gettign all data
const getAllDataFromCart = async (req, res) => {
  const {userId} = req.body;
  try {
    const data = await CartModel.find({ userId });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Getting error while fetching data from cart" });
  }
};

const addToCart = async (req, res) => {
  const { userId } = req.body;
  const { productId} = req.params
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get the price of the product
    const price = product.price;

    // Check if the product already exists in the cart
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new cart and add the product
      cart = new CartModel({
        userId,
        items: [{ productId, quantity: 1, price }],
        totalPrice: price, // Set the initial total price to the product price
      });
    } else {
      // If cart exists, check if the product is already in the cart
      const alreadyPresentItem = cart.items.find(
        (item) => item.productId == productId
      );
      if (alreadyPresentItem) {
        // If the product exists, increase the quantity and update the price
        alreadyPresentItem.quantity += 1;
        alreadyPresentItem.price += price; // Increase the price based on the product price
      } else {
        // Add a new cart item
        cart.items.push({ productId, quantity: 1, price });
      }

      // Calculate the updated total price of the cart
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price,
        0
      );
    }

    await cart.save();
    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Getting error while adding to cart" });
  }
};

//  update quantity
const updateQuantity = async (req, res) => {
  const { userId, quantity } = req.body;
  const { productId} = req.params
  try {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart is not found" });
    }
    const updatedItem = cart.items.find((item) => item.productId == productId);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not present in the cart" });
    }

    // Get the product's price
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const price = product.price;

    // Calculate the updated price for the item based on the new quantity
    const updatedPrice = quantity * price;

    // Update the quantity and price for the item in the cart
    updatedItem.quantity = quantity;
    updatedItem.price = updatedPrice;

    // Calculate the updated total price of the cart
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

    await cart.save();
    res.json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Getting error while updating quantity" });
  }
};

//  delete
const deleteItem = async (req, res) => {
  const { userId } = req.body;
  const productId = req.params.productId;
  try {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart is not found" });
    }

    // Find the item to be deleted in the cart
    const deletedItem = cart.items.find((ele) => ele.productId == productId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // Adjust the total price of the cart by subtracting the deleted item's price
    cart.totalPrice -= deletedItem.price;

    // Remove the item from the cart
    cart.items = cart.items.filter((ele) => ele.productId != productId);

    await cart.save();
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Getting error while fetching data from cart" });
  }
};

module.exports = {
  addToCart,
  updateQuantity,
  getAllDataFromCart,
  deleteItem,
};
