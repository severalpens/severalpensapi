var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
  transfer_id: String,
  msgSenderAddress: String,
  msgSenderPrivateKey: String,
  hashSecret: String,
  hashlock: String,
  contractAddress: String,
  tokenAddress: String,
  amount: Number,
  stage: Number,
  network: String,
  senderAddress: String,
  recipientAddress: String,
  burnAddress: String,
  triggerHash: String,
  transactionHash: String,
  isValid: Boolean,
  status: String,
  creationUtc: Number,
 });
  
  var TransactionsModel = mongoose.model("transactions", transactionsSchema, "transactions");


 var oldSchema = {
  transfer_id: String,
  network: String,
  contract_id: String,
  token_id: String,
  owner_id: String,
  stage: Number,
  senderAddress: String,
  recipientAddress: String,
  amount: Number,
  triggerHash: String,
  transactionHash: String,
  isValid: Boolean,
  status: String,
 }

  var oldOldSchema = {
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
    status: String   
      }


    var oldOldSchema = {
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

