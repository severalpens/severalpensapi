var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var TransactionsModel = require('../models/mongodb/transactions');

var cors = require('cors');
router.use(cors());


router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  if (_id) {
    TransactionsModel.updateOne(
      { _id, locked: false },
      {
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
      },
      function(err, result) {
        res.send([req.body, result]);
      }
    );
  }
});





module.exports = router;
