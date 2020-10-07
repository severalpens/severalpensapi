var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hashPairSchema = new Schema({
  name: String,
  type: String,
  lifespan: String,
  isReadOnly: String,
  user_id: String,

  secret: String,
  hash: String,


  });
  
  var HashPairModel = mongoose.model("hashPair", hashPairSchema, "fleds");
  
  module.exports = HashPairModel;