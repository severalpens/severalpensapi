var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var txbdsSchema = new Schema({
  tfrbd_id: String,
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
  returnVal: String,
  log_id: String,
  txbdHash: String,
  transactionHash: String,
  status: String,
  networkProp: String,
  contractProp: String,
  desc: String,
  methodName: String,
  methodArgs: Array,
  returnArg: String,
  creationUtc: Number,
 });
  
  var txbdsModel = mongoose.model("txbds", txbdsSchema, "txbds");


  module.exports = txbdsModel;

