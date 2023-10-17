const express = require('express');
const CommentController = require('../controllers/articleCommentController.js');
const { checkId } = require('../controllers/articleController');

//define routes for article comments here (for get, post and delete requests)
//use exspress Router
//articleController.checkId should be called before every route
//articleCommentController.checkId should be called before getArticleComment and deleteArticleComment
//articleCommentController.checkArticleComment should be called before postArticleComment

// const router = /*your assignment*/;

const router = express.Router({mergeParams: true});

// router.param("id", checkId);  --does not work???
router.use(checkId);
router.param("commentId", CommentController.checkId)

router.route("/")
.get(CommentController.getAllArticleComments)
.post(CommentController.checkArticleComment, CommentController.postArticleComment);

router.route("/:commentId")
.get(CommentController.getArticleComment)
.delete(CommentController.deleteArticleComment)
  
module.exports = router;
