var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var BpsModel = require('../../models/bps');

router.post("/", bodyParser.json(), function(req, res, next) {
  let bp = req.body;
  console.log(bp);
  bp.user_id = req.user_id;
  BpsModel.create(bp).then(result => {
    res.send(result);
  });
});

module.exports = router;
