var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfers2Schema = new Schema({
  _id: String,
  user_id: String,  
  contract_id: String,
  token_id: String,
  account_id: String,
  status: Number,
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

  
  var Transfers2Model = mongoose.model("transfers2", transfers2Schema, "transfers");
  
  module.exports = Transfers2Model;