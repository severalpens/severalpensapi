var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var FledsModel = require('../models/mongodb/fleds');



router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  let fled = req.body;
  fled.user_id = req.user_id;
  if (_id) {
    FledsModel.updateOne(
      { _id },
      fled,
      function(err, result) {
        if(err){res.send(err)}
        res.send([fled, result]);
      }
    );
  }
});





module.exports = router;
