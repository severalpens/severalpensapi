var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var SequencesModel = require('../models/mongodb/sequences');



router.post("/", bodyParser.json(), function(req, res, next) {
  let sequence = req.body;
  sequence.user_id = req.user_id;
  sequence.fled_ids = req.fled_ids;
  sequence.step_ids = req.step_ids;
  sequence.log_ids = req.log_ids;
  sequence.isActive = true;
  SequencesModel.create(sequence).then(result => {
    res.send(result);
  });
});

module.exports = router;
