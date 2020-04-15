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
    msgSender: req.body.msgSender,
    network: req.body.network,
    transfer_id: req.body.transfer_id,
    stage: req.body.stage,
    contractAddress: req.body.contract,
    senderAddress: req.body.sender,
    recipientAddress: req.body.recipient,
    amount: req.body.amount,
    isValid: req.body.isValid
  }).then(result => {
    res.send(result);
  });
});

module.exports = router;
