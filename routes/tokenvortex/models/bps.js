var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bpsSchema = new Schema({
  dt: String,
  tm: String,
  sys:  String,
  dia:  String,
  });
  
  var BpsModel = mongoose.model("bps", bpsSchema, "bps");
  
  module.exports = BpsModel;
  