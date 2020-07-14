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

module.exports = router;