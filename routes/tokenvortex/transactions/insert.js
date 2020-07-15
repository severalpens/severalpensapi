var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TransactionsModel = require('../models/mongodb/transactions');



router.post("/", bodyParser.json(), function(req, res, next) {
  console.log(req.body);
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
