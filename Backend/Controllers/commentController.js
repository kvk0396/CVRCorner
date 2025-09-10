const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

// Create a comment
const createComment = async (req, res) => {
    try {
        const postExists = await Post.findById(req.body.postId);
        if (!postExists) return res.status(404).json("Post not found");

        if (req.userId !== req.body.userId) {
            return res.status(403).json("Unauthorized user ID");
        }

        const newComment = new Comment({
            comment: req.body.comment,
            author: req.body.author,
            postId: req.body.postId,
            userId: req.userId,
            parentId: req.body.parentId || null,  // Optional parentId for replies
        });

        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Edit a comment
const editComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json("Comment not found");
        }
        if (comment.userId.toString() !== req.userId) {
            return res.status(403).json("You can only edit your own comment");
        }

        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json("Comment not found");
        }
        if (comment.userId.toString() !== req.userId) {
            return res.status(403).json("You can only delete your own comment");
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get comments for a post
const getPostComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId, parentId: null });
        const replies = await Comment.find({ postId: req.params.postId, parentId: { $ne: null } });

        // Group replies under their parent comments
        const commentsWithReplies = comments.map(comment => {
            comment._doc.replies = replies.filter(reply => reply.parentId.toString() === comment._id.toString());
            return comment;
        });

        res.status(200).json(commentsWithReplies);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { createComment, editComment, deleteComment, getPostComments };
