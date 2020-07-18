var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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


var accountsSchema = new Schema({
    name: String,
    owner: String,
    label: String,
    balance: Number,
    address: String,
    privateKey: String,
    publicKey: String,
    mnemonic: String,
    locked: Boolean,
    isActive: Boolean
  });
  
  var AccountsModel = mongoose.model(
    "accounts",
    accountsSchema,
    "accounts"
  );
  
  module.exports = AccountsModel