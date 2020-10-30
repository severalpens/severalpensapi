var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var MedeventsModel = require('../../models/medevents');

router.post("/", bodyParser.json(), function(req, res, next) {
  let medevent = req.body;
  medevent.user_id = req.user_id;
  MedeventsModel.create(medevent).then(result => {
    res.send(result);
  });
});

module.exports = router;
