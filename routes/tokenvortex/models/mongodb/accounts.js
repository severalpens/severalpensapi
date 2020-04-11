var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var accountsSchema = new Schema({
    name: String,
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