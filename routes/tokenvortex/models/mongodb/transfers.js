var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
    id: Number,
    uuid: String,
    transactionHash: String,
    password: String,
    passwordHash: String,
    privateKey: String,
    publicKey: String,
    sender: String,
    recipient: String,
    amount: Number,
    isValid: Boolean,
    result: Boolean
  });
  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;