const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"malhar",(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send({"msg":"Please log in"})
            }
        })
    }else{
        res.send({"msg":"Please log in"})
    }
}

module.exports={
    authentication
}