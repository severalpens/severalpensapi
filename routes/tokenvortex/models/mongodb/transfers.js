var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
  id: Number,
  uuid: String,
  password: String,
  passwordHash: String,
  privateKey: String,
  publicKey: String,
  contract_id: String,
  senderNetwork: String,
  recipientNetwork: String,
  senderAddress: String,
  recipientAddress: String,
  amount: Number,
  isValid: Boolean,
  result: Boolean,

  });
  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;