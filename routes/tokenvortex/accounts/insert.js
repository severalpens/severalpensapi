var express = require("express");
var router = express.Router();
var ethers = require("ethers");
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");
var cors = require('cors');
router.use(cors());

router.post("/", bodyParser.json(),async function(req, res, next) {
  let account = req.body;
  let accountsModel = new AccountsModel();
  accountsModel.name = account.name;
  accountsModel.address = account.address;
  accountsModel.privateKey = account.privateKey;
  accountsModel.user_id = req.user_id;
  accountsModel.isLocked = false;
  accountsModel.isActive = true;
  accountsModel.save((err,result) => {
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log(result);
    res.send(result);

  })
  });
  

module.exports = router;