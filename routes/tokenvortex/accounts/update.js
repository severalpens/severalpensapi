var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");

router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
      AccountsModel.updateOne(
        { _id, locked: false, owner: req._id },
        {
          name: req.body.name,
          address: req.body.address,
          privateKey: req.body.privateKey,
          publicKey: req.body.publicKey,
          mnemonic: req.body.mnemonic,
        },
      ).exec((err,result) => {
        if(err){res.send(err)}
        res.send(result)
      });
  });
  

module.exports = router;