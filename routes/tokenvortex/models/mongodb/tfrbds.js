var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TfrbdsSchema = new Schema({
  user_id: String,
  stage: Number,
  status: String,
  burnAddress: String,
  returnVal: String,
  withdrawn: Boolean,
  desc: String,
  hashSecret: String,
  hashlock: String,
  timelock: Number,
  amount: Number,
  creationUtc: Number

  });

  
  var TfrbdsModel = mongoose.model("tfrbds", TfrbdsSchema, "tfrbds");
  
  module.exports = TfrbdsModel;