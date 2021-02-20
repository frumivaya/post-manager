const mongoose = require('mongoose');
const Comment = require('./Comment')

const postSchema = mongoose.Schema({

    postId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    },
    comments: {
        type: Array,
    
    }
})
module.exports = mongoose.model('Post', postSchema)