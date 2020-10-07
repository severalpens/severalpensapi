var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var timerSchema = new Schema({
  name: String,
  type: String,
  lifespan: String,
  isReadOnly: String,
  user_id: String,

  value: Number
  });
  
  var TimerModel = mongoose.model("timer", timerSchema, "fleds");
  
  module.exports = TimerModel;