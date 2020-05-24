var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logsSchema = new Schema({
  status: String,
  transfer_id: String,
  hash: String,
  startTime: Number,
  endTime: Number
  });
  
  var LogsModel = mongoose.model("logs", logsSchema, "logs");
  
  module.exports = LogsModel;