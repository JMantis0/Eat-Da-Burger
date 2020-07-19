// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    //  "sandwich" here refers to the sandwiches table.  
    orm.selectAll("sandwiches", function(res) {
      cb(res);
    });
  },
  // calls create method from the ORM using data sent from sandwichController
  // then executes the cb send from sandwichController
  create: function(cols, vals, cb) {
    orm.insertOne("sandwiches", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.updateOne("sandwiches", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.deleteOne("sandwiches", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
