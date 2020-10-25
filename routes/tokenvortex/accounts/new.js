var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var ethers = require("ethers");
const AccountsModel = require("../models/mongodb/accounts");



router.get("/", function (req, res, next) {
  var wallet = ethers.Wallet.createRandom();
  var account = new AccountsModel;
  account.body.address = wallet.body.address;
  account.body.privateKey = wallet.body.privateKey;

  res.send(account);
});

module.exports = router;
