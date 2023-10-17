const { readArticlesSync, writeArticles } = require('../dev-data/utils');

exports.checkId = (req, res, next) => {
  const id = req.params.id;
  const articles = readArticlesSync();
  const articleIndex = articles.findIndex(article => article.id === +id);

  if(articleIndex === -1){
    res.status(404).json({ status: 'fail', message: 'Invalid article id' });
    return;
  }
  res.locals.articleIndex = articleIndex;
  next();
};

exports.checkArticle = (req, res, next) => {
  if(!req.body.title){
    res.status(400).json({ status: 'fail', message: 'Title is required' });
    return;
  }

  next();
};

exports.getAllArticles = (req, res) => {
  const articles = readArticlesSync();
  const requestedTitle = String(req.query.title);

  if(req.query.title){
    const articlesWithTitle = articles.reduce((acc, article) => {
      if(article.title.toLowerCase() == requestedTitle.toLowerCase()){
        return [...acc, article];
      }
      return [...acc];
    }, []);

    let response;

    // articlesWithTitle.length === 0 ? 
    // response = { statusCode: 404, data: { status: 'fail', message: "Invalid article title" }} :
    response = { statusCode: 200, data: { status: 'success', data: { count: articlesWithTitle.length, articles: articlesWithTitle }}}

    res.status(response.statusCode).json(response.data);
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      count: articles.length,
      articles: articles,
    },
  })
};

exports.getArticle = (req, res) => {
  const articles = readArticlesSync();
  res.status(200).json({ status: 'success', data: { article: articles[res.locals.articleIndex] }});
};

exports.postArticle = (req, res) => {
  const articles = readArticlesSync();

  let id;
  articles.length === 0 ? id = 0 : id = articles[articles.length - 1].id + 1
  const newArticle = { id: id, ...req.body };

  articles.push(newArticle);

  writeArticles(articles, (err) => {
    if(err){
      throw err
    }
    res.status(201).json({status: 'success',data: { article: newArticle }});
  });
};

exports.patchArticle = (req, res) => {
  const articles = readArticlesSync();
  const articleDataToUpdate = req.body;

  const UpdatedArticleData = {
    ...articles[res.locals.articleIndex],
    ...articleDataToUpdate
  }

  articles.splice(res.locals.articleIndex, 1, UpdatedArticleData);
  
  writeArticles(articles, (err) => {
    if(err){
      throw err
    }
    res.status(200).json({ status: 'success',data: { article: UpdatedArticleData } });
  });
};

exports.deleteArticle = (req, res) => {
  const articles = readArticlesSync();

  articles.splice(res.locals.articleIndex, 1);

  writeArticles(articles, (err) => {
    if(err){
      throw err
    }
    res.status(204).json({ status: 'success',data: { article: null } });
  })
};
