var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logsSchema = new Schema({
  transaction_id: String,
  user_id: String,
  network: String,
  log: Object,
  timestamp: Number
 });
  
  var logsModel = mongoose.model("logs", logsSchema, "logs");


  module.exports = logsModel;

