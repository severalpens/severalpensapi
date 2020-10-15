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
  let user_id = req.user_id;
  await LogsModel.deleteMany({user_id}).exec();
  await StepsModel.deleteMany({user_id}).exec();
  await FieldsModel.deleteMany({user_id}).exec();
  await SequencesModel.deleteMany({user_id}).exec();
  return res.end();
});
  
    




module.exports = router;
