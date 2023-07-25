// importing express for creating userRouter
const express = require("express");

// making router
const userRouter = express.Router();

const { register, login } = require("../controller/user.controller");

// post route for user register
userRouter.post("/register", register);

// post route for  user login
userRouter.post("/login", login);

// exporting userRouter
module.exports = {
  userRouter,
};
