const Comment = require('../models/Comment');
const Post = require('../models/Post');
const postController = require('./postController')

const newComment = async (req, res) => {
    const savedPost = await postController.getPostBy3rdPartyPostId(req.body.postId);
    if (!savedPost) {
        return res.status(500).json({ "error": `post not saved id ${req.body.postId}` });
    }
    req.body.commentId = req.body.id;
    req.body.savedPostId = savedPost._id;
    const commentUpdated = req.body;
    try {
        if (savedPost && savedPost._doc) {
            if (!savedPost._doc.comments || savedPost._doc.comments.length === 0) {
                savedPost._doc.comments.push(commentUpdated);
            } else if (savedPost._doc.comments && savedPost._doc.comments.length) {
                const existedComment = savedPost._doc.comments.findIndex(x => x.commentId === commentUpdated.commentId);
                if(existedComment > -1){
                    savedPost._doc.comments[existedComment] = commentUpdated;    
                }else{
                    savedPost._doc.comments.push(commentUpdated);
                }
                
            }

            await savedPost.updateOne({ _id: commentUpdated.savedPostId }, { $set: { comments: [] } })
            await savedPost.save();
            await savedPost.updateOne({ _id: commentUpdated.savedPostId }, { $set: { comments: savedPost._doc.comments } })
            await savedPost.save();
            
        }
        res.status(200).json( savedPost._doc.comments)
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
}

const getCommentsForAPost = async (req, res) => {
    const thirdPartyPostId = req.params.postId;
    try {
        const savedPostRes = await postController.getPostBy3rdPartyPostId(thirdPartyPostId);
        const savedPost = savedPostRes && savedPostRes._doc;
        let comments = savedPost && savedPost.comments ? savedPost.comments : [];
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
}

const updateComment = async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.commentId, req.body)
        res.status(200).send("updated successfully!")
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.commentId)
        await Post.findByIdAndUpdate(post.commentId, { $pull: { comments: comment._id } })
        await comment.remove();
        await comment.save()
        res.status(200).send("comment deleted successfully!")
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
}

module.exports = { newComment, getCommentsForAPost, updateComment, deleteComment }