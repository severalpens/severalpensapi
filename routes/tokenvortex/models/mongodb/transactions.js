var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
    id: Number,
    uuid: String,
    transactionHash: String,
    stage: String,
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