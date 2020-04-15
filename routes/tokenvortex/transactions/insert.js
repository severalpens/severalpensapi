var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var TransactionsModel = require('../models/mongodb/transactions');

var cors = require('cors');
router.use(cors());


router.post("/", bodyParser.json(), function(req, res, next) {
  TransactionsModel.create({
    id: req.body.id,
    uuid: req.body.uuid,
    transactionHash: req.body.transactionHash,
    password: req.body.password,
    passwordHash: req.body.passwordHash,
    privateKey: req.body.privateKey,
    publicKey: req.body.publicKey,
    transactionAuthor: req.body.transactionAuthor,
    network: req.body.network,
    transfer_id: req.body.transfer_id,
    stage: req.body.stage,
    contract: req.body.contract,
    sender: req.body.sender,
    recipient: req.body.recipient,
    amount: req.body.amount,
    isValid: req.body.isValid
  }).then(result => {
    res.send(result);
  });
});

module.exports = router;
