var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logsSchema = new Schema({
    name: String,
    posId: Number,
    step: Object,
    timestamp: Date,
    tx: Object
  });
  
  var LogsModel = mongoose.model("logs", logsSchema, "logs");
  
  module.exports = LogsModel;