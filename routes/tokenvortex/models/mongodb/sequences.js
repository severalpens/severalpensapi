var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sequencesSchema = new Schema({
    name: String,
    description: String,
    user_id: String,
    fields: Array,
    step: Array,
    logs: Array,
    isActive: Boolean
  });
  
  var SequencesModel = mongoose.model("sequences", sequencesSchema, "sequences");
  
  module.exports = SequencesModel;