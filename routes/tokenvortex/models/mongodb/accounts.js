var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var accountsSchema = new Schema({
    name: String,
    user_id: String,
    label: String,
    balance: Number,
    address: String,
    privateKey: String,
    publicKey: String,
    mnemonic: String,
    isLocked: Boolean,
    isActive: Boolean
  });
  
  var AccountsModel = mongoose.model(
    "accounts",
    accountsSchema,
    "accounts"
  );
  
  module.exports = AccountsModel