var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var schedulesSchema = new Schema({
  name: String,
  category: String,
    scheduleDate: Date,
    timeslots: Array,
  });

  var SchedulesModel = mongoose.model(
    "schedules",
    schedulesSchema,
    "schedules"
  );
  
  module.exports = SchedulesModel