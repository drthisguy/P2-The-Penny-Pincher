// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  //use passport strategy to authenticate
  app.post("/api/login", passport.authenticate("local"), (req, res) => {

    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  //signup route
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  //POST route for new budget item
  app.post("/api/expenses", (req, res) => {
    db.Expense.create({
      user_id: req.body.user_id,
      name: req.body.name,
      category: req.body.category,
      priority: req.body.priority,
      amount: req.body.amount
    }).then( response => res.json(response))
      .catch(err => {if (err) console.log(err)});
  });

  // PUT route for updating budget items
  app.put("/api/expenses", (req, res) => {

    db.Expense.update({
      user_id: req.body.user_id,
      name: req.body.name,
      category: req.body.category,
      priority: req.body.priority,
      amount: req.body.amount
    }, {
      where: {
        id: req.body.id
      }
    }).then( response => res.json(response))
      .catch(err => {res.status(501).json(err)});
  });

 // Route to remove an item 
 app.delete("/api/expenses/:id", (req, res) => {
    
  db.Expense.destroy({
    where: {
      id: req.body.id
    }}).then( data => {        

      res.json(data);
    })
});

  // Route for logging user out
  app.get("/logout", (req, res) => {

    req.logout();
    res.redirect("/");
  });

  // Route to get all items for a user
  app.get("/api/expenses", (req, res) => {
    db.Expense.findAll({
      where: {
        user_id: req.user.id
      }}).then( data => {

        res.json(data);
      })
  });

  // Route to get item by id
  app.get("/api/expenses/:id", (req, res) => {
    db.Expense.findOne({
      where: {
        id: req.params.id
      }}).then( data => {        

        res.json(data);
      })
  });

 
  



  // user data route
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});

    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
