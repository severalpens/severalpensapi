var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../models/mongodb/entities');



router.post("/", bodyParser.json(), function(req, res, next) {
  let entity = req.body;
  entity.user_id = req.user_id;
  entity.isActive = true;
  EntitiesModel.create(entity).then(result => {
    res.send(result);
  });
});

module.exports = router;
