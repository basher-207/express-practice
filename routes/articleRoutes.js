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

//define routes for articles here (for get, post, patch and delete requests)
//use exspress Router
//articleController.checkArticle should be called before articleController.postArticle
//articleController.checkId should be called first for routes with id parameter

// const router = /*your assignment here*/;

const router = express.Router();

router.param("id", checkId);

router.route("/")
.get(getAllArticles)
.post(checkArticle, postArticle);

router.route("/:id")
.get(getArticle)
.patch(patchArticle)
.delete(deleteArticle);

module.exports = router;
