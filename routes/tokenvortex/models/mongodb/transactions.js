var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
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
    });
  
  var TransactionsModel = mongoose.model("transactions", transactionsSchema, "transactions");
  
  module.exports = TransactionsModel;