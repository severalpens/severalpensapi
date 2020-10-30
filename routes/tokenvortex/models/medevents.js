var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var medeventsSchema = new Schema({
  dt: String,
  tm: String,
  med_id:  String,
  amount:  Number,
  });
  
  var MedeventsSchema = mongoose.model("medevents", medeventsSchema, "medevents");
  
  module.exports = MedeventsSchema;
  