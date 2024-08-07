const express = require('express');
const router = express.Router()
const login = require('../Controllers/loginController')
const register = require('../Controllers/registerController')
const logout = require('../Controllers/logoutController')
const verifyToken = require('../Middlewares/authMiddleware')
/* const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') */

const jwt = require('jsonwebtoken')
require('dotenv').config();

//Register

router.post('/register',register)

//Login
router.post('/login',login);


//LOGOUT 
router.post("/logout",logout)



//Refetch user
router.get("/refetch",verifyToken, (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        res.status(200).json(decoded);
    });
});

module.exports = router;