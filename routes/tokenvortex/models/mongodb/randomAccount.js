var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var randomAccountSchema = new Schema({
  name: String,
  type: String,
  lifespan: String,
  isReadOnly: String,
  user_id: String,

  address: String,
  privateKey: String
  
  });
  
  var RandomAccountModel = mongoose.model("randomAccount", randomAccountSchema, "fields");
  
  module.exports = RandomAccountModel;