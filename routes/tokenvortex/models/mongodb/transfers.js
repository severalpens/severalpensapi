var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transfersSchema = new Schema({
    timestamp: Number,
    sender: String,
    recipient: String,
    amount: Number,
    isValid: Boolean,
    result: Boolean
  });
  
  var TransfersModel = mongoose.model("transfers", transfersSchema, "transfers");
  
  module.exports = TransfersModel;