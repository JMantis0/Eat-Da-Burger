const express = require("express");

const router = express.Router();

const sandwich = require("../models/burger.js");

router.get("/", function(req, res) {
  sandwich.all(function(data) {

    const hbsObject = {
      sandwiches: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//  Accepts post calls from front end.  Calls create method from sandwich model (/models/sandwich.js)
//  With sandwich object data received from the client
//  Then sends id back to the client
router.post("/api/sandwiches", (req, res) => {
  sandwich.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], (result) => {
    // Send back the id 
    res.json({ id: result.insertId });

  });
});

router.put("/api/sandwiches/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  sandwich.update({
    devoured: req.body.devoured
  }, condition, (result) => {
    if(result.changedRows === 0) {
      // If no rows changed, ID must not exists thus 404
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/sandwiches/:id", function(req, res) {
  // Settin up SQL condition
  var condition = "id = " + req.params.id;

  sandwich.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});



module.exports = router;