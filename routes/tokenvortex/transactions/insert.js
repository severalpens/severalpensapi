var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var TransactionsModel = require('../models/mongodb/transactions');

var cors = require('cors');
router.use(cors());


router.post("/", bodyParser.json(), function(req, res, next) {
  try {
    TransactionsModel.create({
      id: req.body.id,
      uuid: req.body.uuid,
      transactionHash: req.body.transactionHash,
      stage: req.body.stage,
      key: req.body.key,
      msgSender: req.body.imsgSenderd,
      network: req.body.network,
      transfer_id: req.body.transfer_id,
      contractAddress: req.body.contractAddress,
      senderAddress: req.body.senderAddress,
      recipientAddress: req.body.recipientAddress,
      amount: req.body.amount,
      isValid: req.body.isValid,
      status: req.body.status
    }).then(result => {
      res.send(result);
    });
  } catch (error) {
    res.status(404).send(error);
  }

});

module.exports = router;
