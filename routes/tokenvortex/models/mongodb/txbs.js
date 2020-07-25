var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var txbsSchema = new Schema({
  transfer_id: String,
  desc: String,
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
  contractId: String,
  log_id: String,
  transactionHash: String,
  status: String,
  creationUtc: Number,
 });
  
  var TxbsModel = mongoose.model("txbs", txbsSchema, "txbs");


  module.exports = TxbsModel;

