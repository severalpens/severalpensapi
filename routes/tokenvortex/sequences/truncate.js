var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var SequencesModel = require('../models/mongodb/sequences');
var FieldsModel = require('../models/mongodb/fields');
var StepsModel = require('../models/mongodb/steps');
var LogsModel = require('../models/mongodb/logs');





router.post("/", bodyParser.json(), async function(req, res, next) {
  await LogsModel.deleteMany({}).exec();
  await StepsModel.deleteMany({}).exec();
  await FieldsModel.deleteMany({}).exec();
  await SequencesModel.deleteMany({}).exec();
  return res.end();
});
  
    




module.exports = router;
