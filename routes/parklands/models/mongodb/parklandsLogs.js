var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parklandsLogsSchema = new Schema({
  username: String,
  type: String,
  params: Object,
  result: Object
},{ timestamps: { createdAt: 'created_at' } });
  
  var parklandsLogsModel = mongoose.model(
    "parklandsLogs",
    parklandsLogsSchema,
    "parklandsLogs"
  );
  
  module.exports = parklandsLogsModel