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
    msgSender: String,
    network: String,
    transfer_id: String,
    stage: String,
    contractAddress: String,
    senderAddress: String,
    recipientAddress: String,
    amount: String,
    isValid: String
  });
  
  var ContractsModel = mongoose.model("contracts", transactionsSchema, "contracts");
  
  module.exports = ContractsModel;