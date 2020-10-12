var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var ethers = require("ethers");
var bodyParser = require("body-parser");
var FieldsModel = require("../models/mongodb/fields");




router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    FieldsModel.updateOne({ _id }, { locked: true }).then(result => {
      return res.send(result);
    });
});
  

module.exports = router;