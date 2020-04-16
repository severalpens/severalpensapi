var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
  id: Number,
  uuid: String,
  key: String,
  stage: String,
  contract_id: String,
  senderNetwork: String,
  senderAddress: String,
  recipientNetwork: String,
  recipientAddress: String,
  amount: Number
  });
  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;