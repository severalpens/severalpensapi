var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var accountsSchema = new Schema({
    name: String,
    address: String,
    user_id: String,
    privateKey: String,
    isLocked: Boolean,
    isActive: Boolean
  });

  // {
  //   _id: string;
  //   name: string;
  //   address: string;
  //   user_id: string;
  //   privateKey: string;
  //   publicKey: string;
  //   mnemonic: string;
  //   isLocked: boolean;
  //   isActive: boolean;
  // }

  
  var AccountsModel = mongoose.model(
    "accounts",
    accountsSchema,
    "accounts"
  );
  
  module.exports = AccountsModel