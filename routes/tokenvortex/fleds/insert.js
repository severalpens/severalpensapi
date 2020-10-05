var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var FledsModel = require('../models/mongodb/fleds');



router.post("/", bodyParser.json(), function(req, res, next) {
  let fled = req.body;
  fled.user_id = req.user_id;
  fled.isActive = true;
  FledsModel.create(fled).then(result => {
    res.send(result);
  });
});

module.exports = router;
