var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fledsSchema = new Schema({
    name: String,
    user_id: String,
    isActive: Boolean
  });
  
  var FledsModel = mongoose.model("fleds", fledsSchema, "fleds");
  
  module.exports = FledsModel;