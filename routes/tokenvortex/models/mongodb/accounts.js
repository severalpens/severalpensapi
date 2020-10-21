var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var accountsSchema = new Schema({
  user_id: String,
  entityType: String,
  name: String,
  body: Object,
  options: Array,
  lifespan: String
  });


  
  var AccountsModel = mongoose.model(
    "accounts",
    accountsSchema,
    "entities"
  );
  
  module.exports = AccountsModel