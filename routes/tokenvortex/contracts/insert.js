var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var ContractsModel = require('../models/mongodb/contracts');



router.post("/", bodyParser.json(), function(req, res, next) {
  ContractsModel.create({
        fungible: true,
        symbol: req.body.symbol,
        name: req.body.name,
        version: req.body.version,
        locked: false,
        addresses: req.body.addresses,
        publishers: req.body.publishers,
        owner: req._id,
        soliditycode: req.body.soliditycode,
        abi: req.body.abi,
        isActive: true
  }).then(result => {
    res.send(result);
  });
});

module.exports = router;
