var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var ContractsModel = require('../models/mongodb/contracts');

var cors = require('cors');
router.use(cors());


router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  // console.log(req.params);
  // console.log(req.body);
  if (_id) {
    ContractsModel.updateOne(
      { _id },
      {
        fungible: true,
        symbol: req.body.symbol,
        name: req.body.name,
        version: req.body.version,
        addresses: req.body.addresses,
        owner: req.body.owner,
        soliditycode: req.body.soliditycode,
        abi: req.body.abi,
        bytecode: req.body.bytecode,
      },
      function(err, result) {
        res.send([req.body, result]);
      }
    );
  }
});





module.exports = router;
