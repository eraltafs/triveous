const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const { connection } = require("./config/db");
const { authenticate } = require("./middleware/authentication");

// import of routes
const { userRouter } = require("./routes/user.routes");
const { categoryRouter } = require("./routes/category.routes");
const { productRouter } = require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
const { orderRouter } = require("./routes/order.routes");

app.get("/", authenticate, (req, res) => {
  res.send({ msg: "Base Api" });
});

app.use("/", userRouter);
app.use("/category", categoryRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order",orderRouter)

app.listen(8000, async () => {
  await connection();
  console.log("listening on port 8000");
});
