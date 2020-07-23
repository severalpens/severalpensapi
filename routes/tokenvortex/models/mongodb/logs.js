var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logsSchema = new Schema({
  transaction_id: String,
  log: Object
 });
  
  var logsModel = mongoose.model("logs", logsSchema, "logs");


  module.exports = logsModel;

