const express = require("express");
const router = express.Router();
const verifyToken = require('../Middlewares/authMiddleware')
const {updateUser,deleteUser,getUser} = require('../Controllers/userController')

/* const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const bcrypt = require('bcrypt');  */


// Update
router.put('/:id', verifyToken ,updateUser);

// Delete
router.delete('/:id', verifyToken, deleteUser);

// Get user
router.get('/:id', getUser);

module.exports = router;
