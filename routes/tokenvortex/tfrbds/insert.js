var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/tfrbds');



router.post("/", bodyParser.json(), function(req, res, next) {
  req.body.user_id = req.user_id;
  delete req.body._id;
  TransfersModel.create(req.body).then(result => {
    res.send(result);
  });
});

module.exports = router;
