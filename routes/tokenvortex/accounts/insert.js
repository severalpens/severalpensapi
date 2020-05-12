var express = require("express");
var router = express.Router();
var ethers = require("ethers");
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");
var cors = require('cors');
router.use(cors());
router.post("/", bodyParser.json(), function(req, res, next) {
  console.log(req._id)
  let account = {};
    account.name = req.body.name;
    account.address = req.body.address;
    account.owner = req._id;
    account.privateKey = req.body.privateKey;
    account.publicKey = req.body.publicKey;
    account.mnemonic = req.body.mnemonic;
    account.locked = false;
    account.isActive = true;
    AccountsModel.create(account,(err,result) => {
      if(err){
        res.send(err);
      }
      console.log(result);
      res.send(result);
    });
  });
  

module.exports = router;