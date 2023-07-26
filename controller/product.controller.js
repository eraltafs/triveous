// importing produt.model for creating product function
const { ProductModel } = require("../models/product.model");

// create
const create = async (req, res) => {
  const { title, description, price, availability, categoryId } = req.body;
  try {
    const product = new ProductModel({
      title,
      description,
      price,
      availability,
      categoryId,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to add product" });
  }
};

// get products using categoryId
const getProductByCategoryId = async (req, res) => {
  const id = req.params.categoryId;
  try {
    const product = await ProductModel.find({ categoryId: id });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Getting Error while getting product" });
  }
};

// get products using productId
const getProductByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await ProductModel.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Getting Error while getting product" });
  }
};

// export
module.exports = {
  create,
  getProductByCategoryId,
  getProductByProductId,
};
