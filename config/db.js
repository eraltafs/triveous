const mongoose = require("mongoose");
require("dotenv").config();

// connection configuration for mongoose
const connection = async() => {
    try {
        await mongoose.connect(process.env.mongoUrl);
        console.log("connected to db")
    } catch (error) {
        console.log(error)
        console.log({msg:"error while connecting to DB"})
    }
};

module.exports = {
  connection,
};
