var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
  status: String,
  logbook: Array,
  contract_id: String,
  owner: String,
  senderNetwork: String,
  senderAddress: String,
  burnAddress: String,
  recipientNetwork: String,
  recipientAddress: String,
  amount: Number
  });
  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;