var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var ethers = require("ethers");



// name: String,
// address: String,
// owner: String,
// privateKey: String,
// publicKey: String,
// mnemonic: String,
// locked: Boolean,
// isActive: Boolean



router.get("/", function (req, res, next) {
  var wallet = ethers.Wallet.createRandom();
  console.log(wallet.mnemonic);
  var account = {};
  account._id = '';
  account.name = '';
  account.owner = '';
  account.label = '';
  account.balance = '';
  account.address = wallet.address;
  account.privateKey = wallet.privateKey;
  account.publicKey = wallet.publicKey;
  account.mnemonic = wallet.mnemonic.phrase;
  account.locked = false;
  account.isActive = true;

  res.send(account);
});

module.exports = router;
