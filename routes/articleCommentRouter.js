const express = require('express');
const CommentController = require('../controllers/articleCommentController.js');
const { checkId } = require('../controllers/articleController');

const router = express.Router({mergeParams: true});

router.use(checkId);

router.route("/")
.get(CommentController.getAllArticleComments)
.post(CommentController.checkArticleComment, CommentController.postArticleComment);

router.route("/:commentId")
.all(CommentController.checkId)
.get(CommentController.getArticleComment)
.delete(CommentController.deleteArticleComment)
  
module.exports = router;
