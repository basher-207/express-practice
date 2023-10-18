const express = require('express');
const articleRouter = require('./routes/articleRoutes.js');
const articleCommentRouter = require('./routes/articleCommentRouter.js');

const app = express();

app.use(express.json());

app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/articles/:id/comments", articleCommentRouter);

module.exports = app;
