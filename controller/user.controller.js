const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { UserModel } = require("../models/user.model");

// register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const alreadyUser = await UserModel.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      }
      const user = new UserModel({ name, email, password: secure_password });
      await user.save();
      res.status(201).json({ message: "Account created successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Getting Error while creating account" });
  }
};

// login
const login = async (req, res) => {
    console.log(req.body)
  const { email, password } = req.body;
  try {
     const user = await UserModel.findOne({ email });
    if (user) {
      
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.key);
          res.status(201).json({ token: token, message: "Login Successfull" });
        } else {
          res.status(401).json({ message: "Either email or password wrong" });
        }
      });
    } else {
      res.status(401).json({ message: "Wrong Credential" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Getting Error while loging" });
  }
};

// exporting
module.exports = {
  register,
  login,
};
