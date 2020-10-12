var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var FieldsModel = require('../models/mongodb/fields');



router.post("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  let field = req.body;
  console.log(field);
  field.user_id = req.user_id;
  if (_id) {
    FieldsModel.updateOne(
      { _id },
      field,
      function(err, result) {
        if(err){res.send(err)}
        res.send([field, result]);
      }
    );
  }
});





module.exports = router;
