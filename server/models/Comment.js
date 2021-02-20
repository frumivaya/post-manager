const mongoose = require('mongoose');
const Post = require('./Post')

const commentSchema = mongoose.Schema({
    commentId : {
        type: Number,
        required: true
    },
    userName: {
        type: String
      
    },
    userEmail: {
        type: String
    },
    body: {
        type: String
    },
    postId: {
        type: Number,
        ref: 'Post'
    },
    savedPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

module.exports = mongoose.model('Comment', commentSchema)