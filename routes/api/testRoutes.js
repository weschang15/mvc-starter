const test = require("express").Router();

test.get("/", (req, res) => {
  res.status(200).send("Success, it works!");
});

module.exports = test;
