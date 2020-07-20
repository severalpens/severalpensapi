var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
  contract_id: String,
  token_id: String,
  owner_id: String,
  
  status: Number,
  logbook: Array,
  senderNetwork: String,
  senderAddress: String,
  burnAddress: String,
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

  //   status: Number,
  //   logbook: Array,
  //   contract_id: String,
  //   token_id: String,
  //   owner_id: String,
  //   senderNetwork: String,
  //   senderAddress: String,
  //   burnAddress: String,
  //   recipientNetwork: String,
  //   recipientAddress: String,
  //   amount: Number,
  //   timelock: Number,
  //   withdrawn: Boolean,
  //   refunded: Boolean,
  //   preimage: String,
  //   hashlock: String,
  //   hashSecret: String,
  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;