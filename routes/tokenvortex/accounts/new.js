var express = require("express");
var router = express.Router();
var ethers = require("ethers");
var cors = require('cors');
router.use(cors());


router.get("/", function (req, res, next) {
  var wallet = ethers.Wallet.createRandom();
  var account = {};
  account.address = wallet.signingKey.address;
  account.privateKey = wallet.signingKey.privateKey;
  account.publicKey = wallet.signingKey.publicKey;
  account.mnemonic = wallet.signingKey.mnemonic;

  res.send(account);
});

module.exports = router;
