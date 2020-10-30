var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logbookSchema = new Schema({
  sequence_id: String,
    logs: Array,
  });
  
  var LogbookModel = mongoose.model("logbook", logbookSchema, "logbook");
  
  module.exports = LogbookModel;