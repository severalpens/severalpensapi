var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var ContractsModel = require('../models/mongodb/contracts');

var cors = require('cors');
router.use(cors());


router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  if (_id) {
    ContractsModel.updateOne(
      { _id, locked: false },
      {
        fungible: true,
        symbol: req.body.symbol,
        name: req.body.name,
        version: req.body.version,
        addresses: req.body.addresses,
        owner: req.body.owner,
        soliditycode: req.body.soliditycode,
        abi: req.body.abi,
      },
      function(err, result) {
        res.send([req.body, result]);
      }
    );
  }
});





module.exports = router;
