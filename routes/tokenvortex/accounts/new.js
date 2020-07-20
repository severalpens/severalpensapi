var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var ethers = require("ethers");



router.get("/", function (req, res, next) {
  var wallet = ethers.Wallet.createRandom();
  var account = {};
  account._id = '';
  account.name = '';
  account.user_id = '';
  account.balance = '';
  account.address = wallet.address;
  account.privateKey = wallet.privateKey;
  account.publicKey = wallet.publicKey;
  account.mnemonic = wallet.mnemonic.phrase;
  account.isLocked = false;
  account.isActive = true;

  res.send(account);
});

module.exports = router;
