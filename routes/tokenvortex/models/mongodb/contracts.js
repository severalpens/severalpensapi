var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contractsSchema = new Schema({
  user_id: String,
  entityType: String,
  name: String,
  body: Object,
  options: Array,
  lifespan: String

  });
  
  var ContractsModel = mongoose.model("contracts", contractsSchema, "entities");
  
  module.exports = ContractsModel;