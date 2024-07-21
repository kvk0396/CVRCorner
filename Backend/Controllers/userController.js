const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const bcrypt = require('bcrypt'); 

const updateUser = async (req, res) => {
    try {
        // Check if the user making the request is the same as the user to be updated
        if (req.userId !== req.params.id) {
            return res.status(403).json("You can only update your own account!");
        }

        const idToUpdate = await User.findById(req.params.id);
        if (!idToUpdate) {
            return res.status(404).json("No such user exists");
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        // Check if the user making the request is the same as the user to be deleted
        if (req.userId !== req.params.id) {
            return res.status(403).json("You can only delete your own account!");
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json("No such user exists");
        }
        await Post.deleteMany({ userId: req.params.id });
        await Comment.deleteMany({ userId: req.params.id });
        return res.status(200).json("User deleted successfully");
    } catch (err) {
        return res.status(500).json(err);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json("No such user exists");
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = { updateUser, deleteUser, getUser };
