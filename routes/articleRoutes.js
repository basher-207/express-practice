const express = require('express');
const {
    getAllArticles, 
    getArticle, 
    postArticle, 
    patchArticle, 
    deleteArticle,
    checkId,
    checkArticle
} = require('../controllers/articleController')

const router = express.Router();

router.route("/")
.get(getAllArticles)
.post(checkArticle, postArticle);

router.route("/:id")
.all(checkId)
.get(getArticle)
.patch(patchArticle)
.delete(deleteArticle);

module.exports = router;
