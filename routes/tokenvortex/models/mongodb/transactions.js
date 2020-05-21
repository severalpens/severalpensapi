var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
    triggerHash: String,
    transactionHash: String,
    stage: Number,
    key: String,
    msgSender: String,
    network: String,
    transfer_id: String,
    contractAddress: String,
    senderAddress: String,
    recipientAddress: String,
    amount: String,
    isValid: String,
    status: String
    });
  
  var TransactionsModel = mongoose.model("transactions", transactionsSchema, "transactions");
  
  module.exports = TransactionsModel;