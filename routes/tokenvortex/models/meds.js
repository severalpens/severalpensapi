var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var medsSchema = new Schema({
  name:  String,
  });
  
  var MedsModel = mongoose.model("meds", medsSchema, "meds");
  
  module.exports = MedsModel;
  