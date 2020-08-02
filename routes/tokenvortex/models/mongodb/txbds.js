var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var txbdsSchema = new Schema({
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

  // _id?: string;
  // stage: number;
  // status: string;
  // tfrbd_id: string;
  // network: string;
  // msgSender_id: string;
  // contract_id: string;
  // method: any;
  // amount: number;
  // creationUtc: number;