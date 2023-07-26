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

app.get("/", authenticate, (req, res) => {
  res.send({ msg: "Base Api" });
});

app.use("/", userRouter);
app.use("/category", categoryRouter)

app.listen(8000, async () => {
  await connection();
  console.log("listening on port 8000");
});
