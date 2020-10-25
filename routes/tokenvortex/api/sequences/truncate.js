var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var SequencesModel = require('../../models/sequences');
var StepsModel = require('../../models/steps');
var LogsModel = require('../../models/logs');





router.post("/", bodyParser.json(), async function(req, res, next) {
  let user_id = req.user_id;
  await LogsModel.deleteMany({user_id}).exec();
  await StepsModel.deleteMany({user_id}).exec();
  await SequencesModel.deleteMany({user_id}).exec();
  return res.end();
});
  
    




module.exports = router;
