var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
  stage: Number,
  contract_id: String,
  owner: String,
  senderNetwork: String,
  burnAddress: String,
  senderAddress: String,
  recipientNetwork: String,
  recipientAddress: String,
  amount: Number
  });
  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;