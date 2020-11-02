var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var summary1Schema = new Schema({
  id: Number,
  transactionHash: String,
  method: String,
  gasUsed: Number,
  split: Number,
  cpu: Number

},{ timestamps: { createdAt: 'created_at' } });
  
  var Summary1Model = mongoose.model("summary1", summary1Schema, "summary1");
  
  module.exports = Summary1Model;