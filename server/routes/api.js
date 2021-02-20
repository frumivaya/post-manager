const router = require('express').Router();
const post = require('../controllers/postController')
const comment = require('../controllers/commentController')

router.post('/new_post', post.newPost)
router.get('/get_all_saved_posts', post.getAllSavedPosts)
router.get('/getPost', post.getPost)
router.delete('/delete_post/:postId', post.deletePost)


router.post('/new_comment', comment.newComment)
router.get('/gat_all_comments_post/:postId', comment.getCommentsForAPost)
router.put('/update_comment/:commentId', comment.updateComment)
router.delete('/delete_comment/:commentId', comment.deleteComment)

module.exports = router;

