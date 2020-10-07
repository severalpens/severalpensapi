var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fledsSchema = new Schema({
    name: String,
    type: String,
    lifespan: String,
    isReadOnly: String,
    user_id: String,

    value: String,
    secret: String,

  });
  
  var FledsModel = mongoose.model("fleds", fledsSchema, "fleds");
  
  module.exports = FledsModel;