var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
    id: Number,
    uuid: String,
    transactionHash: String,
    password: String,
    passwordHash: String,
    privateKey: String,
    publicKey: String,
    transactionAuthor: String,
    network: String,
    transfer_id: String,
    stage: String,
    contract: String,
    sender: String,
    recipient: String,
    amount: String,
    isValid: String
  });
  
  var ContractsModel = mongoose.model("contracts", transactionsSchema, "contracts");
  
  module.exports = ContractsModel;