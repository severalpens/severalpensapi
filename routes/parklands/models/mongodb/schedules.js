var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var schedulesSchema = new Schema({
  id: String,
  name: String,
  dateJson: Object,
  category: String,
    scheduleDate: Date,
    timeslots: Array,
    year: Number, 
    month: Number,
    day: Number
  });

  var SchedulesModel = mongoose.model(
    "schedules",
    schedulesSchema,
    "schedules"
  );
  
  module.exports = SchedulesModel