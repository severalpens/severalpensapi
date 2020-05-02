var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tokensSchema = new Schema({
    access_token: String
  });
  
  var TokensModel = mongoose.model(
    "tokens",
    tokensSchema,
    "tokens"
  );
  
  module.exports = AccountsModel