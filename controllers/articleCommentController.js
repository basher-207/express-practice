const { readArticlesSync, writeArticles } = require('../dev-data/utils');

exports.checkId = (req, res, next) => {
  const articles = readArticlesSync();
  const articleCommnets = articles[res.locals.articleIndex].comments;
  const commentIndex = articleCommnets.findIndex(comment => comment.id === +req.params.commentId);

  if(commentIndex === -1){
    res.status(404).json({ status: 'fail', message: 'Invalid comment id' });
    return;
  }else{
    res.locals.commentIndex = commentIndex;
    next()
  }
};

exports.checkArticleComment = (req, res, next) => {
  if(!req.body.content){
    res.status(400).json({status: 'fail', message: 'Content is required'});
    return;
  }
  next();
};

exports.getAllArticleComments = (req, res) => {
  const articles = readArticlesSync();
  const articleIndex = res.locals.articleIndex;

  res.status(200).json({ 
    status: 'success', 
    data: { 
      count: articles[articleIndex].comments.length,
      comments: articles[articleIndex].comments
    }
  });
};

exports.getArticleComment = (req, res) => {
  const articles = readArticlesSync();
  const commentFound = articles[res.locals.articleIndex].comments[res.locals.commentIndex];
  res.status(200).json({ 
    status: 'success', 
    data: { 
      comment: commentFound
    }
  });
};

exports.postArticleComment = (req, res) => {
  const articles = readArticlesSync();
  const articleComments = articles[res.locals.articleIndex].comments
  let id;

  articleComments.length === 0 ?
  id = 0 :
  id = articleComments[articleComments.length - 1].id + 1

  const newComment = {
    id: id,
    ...req.body
  }

  articleComments.push(newComment);

  writeArticles(articles, (err) => {
    if(err){
      throw err
    }
    res.status(201).json({ 
      status: 'success', 
      data: { 
        comment: newComment
      }
    });
  });
};

exports.deleteArticleComment = (req, res) => {
  const articles = [...readArticlesSync()];
  articles[res.locals.articleIndex].comments.splice(res.locals.commentIndex, 1);

  writeArticles(articles, (err) => {
    if(err){
      throw err
    }
    res.status(204).json({ 
      status: 'success', 
      data: { comment: null } 
    });
  });
};
