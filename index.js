const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { authenticate } = require("./middleware/authentication")
const { userRouter } = require("./routes/user.routes")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/",authenticate,(req,res)=>{
    res.send({msg:"Base Api"})
})
app.use("/",userRouter)
app.listen(8000,async()=>{
    await connection()
    console.log("listening on port 8000")
})