const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json('Access denied! No token provided.')
    }
    jwt.verify(token,process.env.SECRET_KEY,async(err,data)=>{
        if(err){
            return res.status(403).json("Token is not valid!")
        }
        req.userId=data.id 
        next()
    })
}

module.exports=verifyToken