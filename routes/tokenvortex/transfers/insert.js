var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/transfers');

var cors = require('cors');
router.use(cors());


router.post("/", bodyParser.json(), function(req, res, next) {
  TransfersModel.create({
    id: req.body.id,
    uuid: req.body.uuid,
    transactionHash: req.body.transactionHash,
    password: req.body.password,
    passwordHash: req.body.passwordHash,
    privateKey: req.body.privateKey,
    publicKey: req.body.publicKey,
    sender: req.body.sender,
    recipient: req.body.recipient,
    amount: req.body.amount,
    isValid: req.body.isValid,
    result: req.body.result
  }).then(result => {
    res.send(result);
  });
});

module.exports = router;
