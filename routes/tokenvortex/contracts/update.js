var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var ContractsModel = require('../models/mongodb/contracts');



router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  if (_id) {
    ContractsModel.updateOne(
      { _id },
      {
        fungible: true,
        symbol: req.body.symbol,
        name: req.body.name,
        version: req.body.version,
        addresses: req.body.addresses,
        publishers: req.body.publishers,
        owner: req._id,
        soliditycode: req.body.soliditycode,
        abi: req.body.abi,
      },
      function(err, result) {
        if(err){res.send(err)}
        res.send([req.body, result]);
      }
    );
  }
});





module.exports = router;
