var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var LogsModel = require('../_models/logs');



router.post("/", bodyParser.json(), function(req, res, next) {
  let log = req.body;
  log.user_id = req.user_id;
  log.isActive = true;
  LogsModel.create(log).then(result => {
    res.send(result);
  });
});

module.exports = router;
