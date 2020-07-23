var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
  user_id: String,  
  contract_id: String,
  token_id: String,
  account_id: String,
  stage: Number,
  status: String,
  logbook: Array,
  senderNetwork: String,
  senderAddress: String,
  burnAddress: String,
  contractId: String,
  recipientNetwork: String,
  recipientAddress: String,
  amount: Number,
  timelock: Number,
  withdrawn: Boolean,
  refunded: Boolean,
  preimage: String,
  hashlock: String,
  hashSecret: String,
  creationUtc: Number,
  });

  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;