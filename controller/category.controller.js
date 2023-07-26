const { CategoryModel } = require("../models/category.model");


// create
const category = async (req, res) => {
  const { name } = req.body;
  try {
    const result = new CategoryModel({ name });
    await result.save();
    res.status(201).json({ message: "category added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to add category" });
  }
};

// get

const getCategory = async (req, res) => {
  try {
    const result = await CategoryModel.find();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Getting error while fetching category" });
  }
};

// export
module.exports = {
  category,
  getCategory,
};
