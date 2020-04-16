var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/transfers');

var cors = require('cors');
router.use(cors());


router.post("/", bodyParser.json(), function(req, res, next) {
 console.log('/tokenvortex/transfers/insert (post) reached');
  TransfersModel.create({
    id: req.body.id,
    uuid: req.body.uuid,
    key: req.body.key,
    stage: req.body.stage,
    contract_id: req.body.contract_id,
    senderNetwork: req.body.senderNetwork,
    senderAddress: req.body.senderAddress,
    recipientNetwork: req.body.recipientNetwork,
    recipientAddress: req.body.recipientAddress,
    amount: req.body.amount
  }).then(result => {
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
