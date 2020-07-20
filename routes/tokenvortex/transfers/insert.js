var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/transfers');



router.post("/", bodyParser.json(), function(req, res, next) {
  console.log(JSON.stringify(req.body));
  TransfersModel.create(req.body).then(result => {
    res.send(result);
  });
});

module.exports = router;
