var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TransactionsModel = require('../models/mongodb/transactions');



router.post("/", bodyParser.json(), function(req, res, next) {
  try {
    TransactionsModel.create(req.body).then(result => {
      res.send(result);
    });
  } catch (error) {
    res.status(404).send(error);
  }

});

module.exports = router;
