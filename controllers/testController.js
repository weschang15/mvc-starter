const testController = {};

testController.get = (req, res) => {
  res.status(200).send("Success, it works!");
};

module.exports = testController;
