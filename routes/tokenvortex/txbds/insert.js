var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TxbdsModel = require('../models/mongodb/txbds');



router.post("/", bodyParser.json(), function(req, res, next) {
  req.body.user_id = req.user_id;
  delete req.body._id;
  try {
    TxbdsModel.create(req.body).then(result => {
      res.send(result);
    });
  } catch (error) {
    res.status(404).send(error);
  }

});

module.exports = router;