var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stepsSchema = new Schema({
    name: String,
    user_id: String,
    isActive: Boolean
  });
  
  var StepsModel = mongoose.model("steps", stepsSchema, "steps");
  
  module.exports = StepsModel;