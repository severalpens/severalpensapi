var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stepsSchema = new Schema({
  status: String,
  network:  String,
  msgSender_id:  String,
  contract_id:  String,
  constant: Boolean,
  inputs: Array,
  name: String,
  user_id: String,
  outputs: Array,
  payable: Boolean,
  stateMutability: String
  });
  
  var StepsModel = mongoose.model("steps", stepsSchema, "steps");
  
  module.exports = StepsModel;