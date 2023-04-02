const express=require("express")
const {connection}=require("./db")
require("dotenv").config()
const {userRouter}=require("./routes/user.routes")
const cors=require("cors")
const {authentication}=require("./middlewares/authentication.middleware")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use(authentication)

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.listen(process.env.port,async()=>{
    try{
         await connection
         console.log("Connected to Mongodb Atlas")
    }catch(err){
        console.log("Unable to connect to Mongodb Atlas")
        console.log(err)
    }
    console.log("Server is running.")
})