const express = require("express");

const router = express.Router();

const sandwich = require("../models/sandwich.js");

router.get("/", function(req, res) {
  sandwich.all(function(data) {

    const hbsObject = {
      sandwiches: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/sandwiches", (req, res) => {
  sandwich.create([
    "name", "consumed"
  ], [
    req.body.name, req.body.consumed
  ], (result) => {
    // Send back the id 
    res.json({ id: result.insertId });

  });
});

router.put("/api/sandwiches/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  sandwich.update({
    consumed: req.body.consumed
  }, condition, (result) => {
    if(result.changedRows === 0) {
      // If no rows changed, ID must not exists thus 404
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;