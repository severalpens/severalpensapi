var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logsSchema = new Schema({
    name: String,
    user_id: String,
    isActive: Boolean
  });
  
  var LogsModel = mongoose.model("logs", logsSchema, "logs");
  
  module.exports = LogsModel;