const test = require("express").Router();
const { testController } = require("../../controllers");

test.get("/", testController.get);

module.exports = test;
