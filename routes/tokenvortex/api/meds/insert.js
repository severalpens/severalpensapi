var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var MedsModel = require('../../models/meds');

router.post("/", bodyParser.json(), function(req, res, next) {
  let med = req.body;
  med.user_id = req.user_id;
  MedsModel.create(med).then(result => {
    res.send(result);
  });
});

module.exports = router;
