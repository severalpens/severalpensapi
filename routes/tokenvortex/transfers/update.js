var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/transfers');




router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  if (_id) {
    TransfersModel.updateOne(
      { _id },
      {
        id: req.body.id,
        uuid: req.body.uuid,
        key: req.body.key,
        stage: req.body.stage,
        contract_id: req.body.contract_id,
        owner: req._id,
        senderNetwork: req.body.senderNetwork,
        senderAddress: req.body.senderAddress,
        recipientNetwork: req.body.recipientNetwork,
        recipientAddress: req.body.recipientAddress,
        amount: req.body.amount
      },
      function(err, result) {
        res.send([req.body, result]);
      }
    );
  }
});


router.post("/stage", bodyParser.json(), function(req, res, next) {
  let _id = req.body.transfer_id;
  let stage = req.body.stage;
  if (_id) {
    TransfersModel.updateOne(
      { _id },
      { stage },
      function(err, result) {
        res.status(200).send(`stage for ${_id} updated to ${stage}`);
      }
    );
  }
});




module.exports = router;
