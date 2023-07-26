
const {Router} = require("express");
const userRouter = Router();

const { register, login } = require("../controller/user.controller");

// post route for user register
userRouter.post("/register", register);

// post route for  user login
userRouter.post("/login", login);

// exporting userRouter
module.exports = {
  userRouter,
};
