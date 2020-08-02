var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var txbdsSchema = new Schema({
  id: Number,
  user_id: String,
  stage: Number,
  status: String,
  tfrbd_id: String,
  network: String,
  msgSender_id: String,
  contract_id: String,
  amount: Number,
  method: Object,
  creationUtc: Number,

 });
  
  var txbdsModel = mongoose.model("txbds", txbdsSchema, "txbds");


  module.exports = txbdsModel;
