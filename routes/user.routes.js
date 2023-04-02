const express=require("express")
const {UserModel}=require("../model/user.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


//register
userRouter.post("/register",async(req,res)=>{
    try{
        const {name,email,gender,password,age,city,is_married}=req.body;
        
        const user=await UserModel.findOne({email})
        
        if(user){
            res.status(200).send({"msg":"User already exist, please login"})
           
        }else if(req.body.password.length<8){
            res.status(200).send({"msg":"Please enter atleast 8 digit password."})
            
        }
        else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(400).send({"msg":err.message})
                }else{
                    const user=new UserModel({name,email,gender,password:hash,age,city,is_married})
                    await user.save();
                    res.status(200).send({"msg":"New user is registered successfully."})
                }
            })
        }
    

    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//login
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"malhar")
                    res.status(200).send({"msg":"Logged in successfully.","token":token})
                }else{
                    res.status(400).send({"msg":"Wrong Credentials,please try again."})
                }
            })
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})



module.exports={
    userRouter
}

