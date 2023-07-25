// importing jwt
const jwt = require("jsonwebtoken");

// configuration of environment file
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1] || req.cookies.token || "";
    if (token) {
      const decode = jwt.verify(token, process.env.key);
      if (decode) {
        req.user = decode;
        console.log(req.user);
        next();
      } else {
        res.status(401).json({ message: "Please Login Again" });
      }
    } else {
      res.status(401).json({ message: "Please Login First" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Please Login First" });
  }
};

// exporting authenticate
module.exports = {
  authenticate,
};
