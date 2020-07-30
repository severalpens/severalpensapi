var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/tfrbds');




router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  if (_id) {
    TransfersModel.updateOne(
      { _id },
      req.body,
      function(err, result) {
        res.send([req.body, result]);
      }
    );
  }
});


router.post("/stage", bodyParser.json(), function(req, res, next) {
  let _id = req.body.tfrbd_id;
  let stage = req.body.stage;
  if (_id) {
    TransfersModel.updateOne(
      { _id },
      { stage },
      function(err, result) {
        res.status(200).send(`stage for ${_id} updated to ${stage}`);
      }
    );
  }
});




module.exports = router;
