var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/transfers');

var cors = require('cors');
router.use(cors());


router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  if (_id) {
    TransfersModel.updateOne(
      { _id, locked: false },
      {
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
      },
      function(err, result) {
        res.send([req.body, result]);
      }
    );
  }
});





module.exports = router;
