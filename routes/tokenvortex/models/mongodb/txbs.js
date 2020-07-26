var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var txbsSchema = new Schema({
  transfer_id: String,
  networkProp: String,
  contractProp: String,
  stage: Number,
  desc: String,
  methodName: String,
  methodArgs: Array,
  returnArg: String,
  creationUtc: Number,
 });
  
  var TxbsModel = mongoose.model("txbs", txbsSchema, "txbs");


  module.exports = TxbsModel;

