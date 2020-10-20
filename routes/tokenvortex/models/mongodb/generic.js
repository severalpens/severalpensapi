var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var genericSchema = new Schema({
  entityType: String,
  name: String,
  type: String,
  lifespan: String,
  isReadOnly: String,
  user_id: String,
  value: String
  });
  
  var GenericModel = mongoose.model("generic", genericSchema, "entities");
  
  module.exports = GenericModel;