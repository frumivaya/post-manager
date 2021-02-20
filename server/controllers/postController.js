const Post = require('../models/Post')

const newPost = async (req, res) => {
    req.body.postId = req.body.id;
    let myPost = new Post(req.body)
    try {
        await myPost.save()
        res.status(200).json({ newPost: myPost })
    } catch (err) {
        res.status(400).send('cannot save new post:', err.message)
    }
}
const getPostByPostId = async (thirdPartyPostId) => {
    const retirvedPost = await Post.findOne({ "postId": thirdPartyPostId }).exec();
    return retirvedPost;
}


const getAllSavedPosts = async (req, res) => {
    try {
        let posts = await Post.find().exec();
        if (posts == null) {
            res.send("could not have posts")
        }
        res.status(200).json({ allPosts: posts.map(x => x._doc) })
    } catch (err) {
        res.status(500).json({ myMessage: err.message })
    }
}

const getPost = (req, res) => {
    Post.findById(req.params.postId).populate('comments')
        .then((post) => {
            res.status(200).json({ thePost: post })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}


const deletePost = async (req, res) => {
    try {
        const retirvedPost = await Post.findOne({ "postId": req.params.postId }).exec();
        if (retirvedPost) {
            await retirvedPost.delete();
        }
        res.status(200).send("the post is deleted ")
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

module.exports = { newPost, getPost, getAllSavedPosts, deletePost, getPostBy3rdPartyPostId: getPostByPostId }