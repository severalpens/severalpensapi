var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var FieldsModel = require('../models/mongodb/fields');



router.post("/", bodyParser.json(), function(req, res, next) {
  console.log('insert fields reached');
  let field = req.body;
  field.user_id = req.user_id;
  field.isActive = true;
  FieldsModel.create(field).then(result => {
    res.send(result);
  });
});

module.exports = router;
