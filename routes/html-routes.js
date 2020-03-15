const path = require("path");
const db = require("../models");
const moment = require("moment");
const isAuthenticated = require("../config/middleware/isAuthenticated");

//helper for reformatting timestamps
function formatTimeStamps(data) {

      data.forEach( time => {

        time.createdAt = moment(time).format("ddd, MMM Do, h:mma");
    }) 
    return data;
 }

module.exports = function(app) {

  app.get("/", (req, res) => {
    // redirect logged in users
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function(req, res) {
    
    // redirect logged in users
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  //render handlebars for thet members page. Or isAuthenticated will redirect to the main page
  app.get("/members", isAuthenticated, function(req, res) {
    
    db.Expense.findAll({
      raw: true,
      where: {
        user_id: req.user.id
      } }).then( dbResponse => {      
        
        dbResponse = formatTimeStamps(dbResponse);

        res.render("index", {expenses: dbResponse})
      }).catch( err =>  {if (err) console.log(err)})
  });
};
