var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var fieldsSchema = new Schema({
    name: String,
    type: String,
    subtype: String,
    lifespan: String,
    object_id: String,
    contractField: Object,
    contractFieldValue: String,
    isReadOnly: String,
    user_id: String,
    value: String,
    secret: String,
    hashPair: Object,
    randomAccount: Object,
    items: Array

  });
  
  var FieldsModel = mongoose.model("fields", fieldsSchema, "fields");
  
  module.exports = FieldsModel;