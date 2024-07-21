const express = require('express');
const router = express.Router()
const login = require('../Controllers/loginController')
const register = require('../Controllers/registerController')
const logout = require('../Controllers/logoutController')
const verifyToken = require('../Middlewares/authMiddleware')
/* const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') */


//Register

router.post('/register',register)

//Login
router.post('/login',login);


//LOGOUT 
router.get("/logout",verifyToken,logout)

module.exports = router;