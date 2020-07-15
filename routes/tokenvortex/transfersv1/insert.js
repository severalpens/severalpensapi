var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/transfers');



router.post("/", bodyParser.json(), function(req, res, next) {
  TransfersModel.create({
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
  }).then(result => {
    res.send(result);
  });
});

module.exports = router;