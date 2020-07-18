var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");

// account._id = '';
// account.name = '';
// account.owner = '';
// account.label = '';
// account.balance = '';
// account.address = wallet.address;
// account.privateKey = wallet.privateKey;
// account.publicKey = wallet.publicKey;
// account.mnemonic = wallet.mnemonic.phrase;
// account.locked = false;
// account.isActive = true;





router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    console.log(`req.params._id: ${req.params._id}`);
    console.log(`req._id: ${req._id}`);
    console.log(req.body);
      AccountsModel.updateOne(
        { _id, locked: false, owner: req._id },
        {
          name: req.body.name,
          label: req.body.label,
          balance: req.body.balance,
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