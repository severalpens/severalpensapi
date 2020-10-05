var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sequencesSchema = new Schema({
    name: String,
    description: String,
    user_id: String,
    fled_ids: Array,
    isActive: Boolean
  });
  
  var SequencesModel = mongoose.model("sequences", sequencesSchema, "sequences");
  
  module.exports = SequencesModel;