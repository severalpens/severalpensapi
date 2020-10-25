var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var SchedulesModel = require('../models/schedules');


router.post("/:id", bodyParser.json(), function(req, res, next) {
  try {
  let id = req.params.id;
  if (id) {
    SchedulesModel.updateOne(
      { id},
      req.body,
      function(err, result) {
        res.send(result);
      });
  }
} catch (error) {
  res.status(404).send(error);
}
});





module.exports = router;
