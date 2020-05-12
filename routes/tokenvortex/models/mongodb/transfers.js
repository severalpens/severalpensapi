var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
  id: Number,
  uuid: String,
  key: String,
  stage: Number,
  contract_id: String,
  owner: String,
  senderNetwork: String,
  senderAddress: String,
  recipientNetwork: String,
  recipientAddress: String,
  amount: Number
  });
  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;