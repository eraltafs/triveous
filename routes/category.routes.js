const { Router } = require("express");
const categoryRouter = Router();

const { category, getCategory } = require("../controller/category.controller");

// create
categoryRouter.post("/", category);

// get
categoryRouter.get("/", getCategory);

// export
module.exports = {
  categoryRouter,
};
