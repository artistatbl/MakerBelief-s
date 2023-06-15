const articles = require ("../controller/task.controller"),
      auth =require('../lib/authentication');


module.exports = function(app){
  
    app.route("/articles/")
      .get(articles.getAll)
      .post(auth.isAuthenticated, articles.create);

    app.route("/articles/:article_id")
      .get( articles.getOne)

    app.route("/articles/:article_id")
     .patch( auth.isAuthenticated, articles.updateArticle)
      .delete( auth.isAuthenticated,  articles.deleteArticle)
      
}