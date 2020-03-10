// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect(`/members/${req.user.id}`);
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //reroute any links that just have '/members'
  app.get("/members", function(req, res) {
    
    if (req.user) {
      res.redirect(`/members/${req.user.id}`);
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", function(req, res) {
    
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect(`/members/${req.user.id}`);
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members/:id", isAuthenticated, function(req, res) {
    
    db.Category.findAll( {} ).then( categories => {

      db.Expense.findAll({
        where: {
          user_id: req.user.id
        } }).then( expenses => {

          res.render("index", handler = {
            categories: categories,
            expenses: expenses
          })

        })
    })
  });

};
