var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var entitiesSchema = new Schema({
    entityType: String,
    entity: Object
  });
  
  var EntitiesModel = mongoose.model("entities", entitiesSchema, "entities");
  
  module.exports = EntitiesModel;