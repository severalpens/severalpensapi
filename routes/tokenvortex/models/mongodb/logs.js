var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logsSchema = new Schema({
    seq_id: String,
    user_id: String,
    posId: Number,
    step: Object,
    timestamp: Number,
    tx: Object,
    status: String
  });
  
  var LogsModel = mongoose.model("logs", logsSchema, "logs");
  
  module.exports = LogsModel;