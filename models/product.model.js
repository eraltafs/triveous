const mongoose = require("mongoose");

// schema
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: "ObjectId",
    ref: "category",
    required: true,
  },
});

// model
const ProductModel = mongoose.model("products", productSchema);

// expor
module.exports = {
  ProductModel,
};
