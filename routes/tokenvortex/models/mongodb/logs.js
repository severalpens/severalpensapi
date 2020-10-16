var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logsSchema = new Schema({
    seq_id: String,
    posId: Number,
    step: Object,
    timestamp: Date,
    tx: Object,
    status: String
  });
  
  var LogsModel = mongoose.model("logs", logsSchema, "logs");
  
  module.exports = LogsModel;