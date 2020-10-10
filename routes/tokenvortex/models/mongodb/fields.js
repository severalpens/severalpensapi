var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fieldsSchema = new Schema({
    name: String,
    type: String,
    lifespan: String,
    isReadOnly: String,
    user_id: String,
    value: String,
    secret: String,

  });
  
  var FieldsModel = mongoose.model("fields", fieldsSchema, "fields");
  
  module.exports = FieldsModel;