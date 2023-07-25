const mongoose=require("mongoose")

// user schema
const userSchema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})

// user model
const UserModel=mongoose.model("users",userSchema)


module.exports={
    UserModel
}