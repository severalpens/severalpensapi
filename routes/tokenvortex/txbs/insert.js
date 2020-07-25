var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TxbsModel = require('../models/mongodb/txbs');



router.post("/", bodyParser.json(), function(req, res, next) {
  try {
    TxbsModel.create(req.body).then(result => {
      res.send(result);
    });
  } catch (error) {
    res.status(404).send(error);
  }

});

module.exports = router;
