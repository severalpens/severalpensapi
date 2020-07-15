var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
  id: Number,
  uuid: String,
  transactionHash: String,
  stage: Number,
  key: String,
  msgSender: String,
  network: String,
  transfer_id: String,
  contractAddress: String,
  senderAddress: String,
  recipientAddress: String,
  amount: Number,
  isValid: Boolean,
  status: String    });
  
  var TransactionsModel = mongoose.model("transactions", transactionsSchema, "transactions");

  var oldSchema = {
    triggerHash: String,
    transactionHash: String,
    logs: Array,
    network: String,
    transfer_id: String,
    contractAddress: String,
    senderAddress: String,
    recipientAddress: String,
    amount: String,
    status: String
    }
  module.exports = TransactionsModel;

