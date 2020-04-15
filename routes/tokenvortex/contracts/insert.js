var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var ContractsModel = require('../models/mongodb/contracts');

var cors = require('cors');
router.use(cors());


router.post("/", bodyParser.json(), function(req, res, next) {
  ContractsModel.create({
        fungible: true,
        symbol: req.body.symbol,
        name: req.body.name,
        version: req.body.version,
        locked: false,
        addresses: req.body.addresses,
        owner: req.body.owner,
        soliditycode: req.body.soliditycode,
        abi: req.body.abi,
        isActive: true
  }).then(result => {
    res.send(result);
  });
});

module.exports = router;
