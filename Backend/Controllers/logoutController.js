const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

const logout = async(req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully")
    }
    catch(err){
        res.status(500).json({error:'Internal Server error'});
    }
}

module.exports = logout;