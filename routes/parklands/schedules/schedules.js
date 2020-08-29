var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));
var parklandsLogsModel = require("../models/mongodb/parklandsLogs");

var updateRouter = require("./update");
var insertRouter = require("./insert");
var deleteRouter = require("./delete");

router.use(cors());

router.use('/update',updateRouter);
router.use('/insert',insertRouter);
router.use('/delete',deleteRouter);

var SchedulesModel = require('../models/mongodb/schedules');

router.get("/", bodyParser.json(), function(req, res, next) {
  let log = new parklandsLogsModel();
  log.type = 'schedules';
  log.username = req.username;
  log.save();

  SchedulesModel.find({})
    .collection(SchedulesModel.collection)
    .exec((err, schedules) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(schedules);
      }
    });
});



router.get("/:id", bodyParser.json(), function(req, res, next) {
  let id = req.params.id;
  let log = new parklandsLogsModel();
  log.params = req.params;
  log.type = `schedule for ${id}`;
  log.username = req.username;
  // console.log('asdfasf');
  SchedulesModel.findOne({id})
  .collection(SchedulesModel.collection)
  .exec((err, schedule) => {
    if (err != null) {
      log.result = err;
      log.save();
      return res.send(err);
    } 
    else {
      log.result = schedule;
      log.save();
      return res.send(schedule);
      }
    });
});

module.exports = router;
