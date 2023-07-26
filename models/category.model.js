const mongoose = require("mongoose");

//  schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

// model
const CategoryModel = mongoose.model("category", categorySchema);

module.exports = {
  CategoryModel,
};
