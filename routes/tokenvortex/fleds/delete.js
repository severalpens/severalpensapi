var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var FieldsModel = require('../models/mongodb/fields');



router.post("/", bodyParser.json(), function(req, res, next) {
  let _id = req.body._id;
  FieldsModel.deleteOne({_id},(err) => {
    if(err){
      res.send(err);
    }
    res.send({});
  });
});
 


router.post("/:_id", bodyParser.json(), function(req, res, next) {
let _id = req.params._id;
FieldsModel.deleteOne({_id},(err) => {
  if(err){
    res.send(err);
  }
  res.send({});
});
});



router.delete("/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  FieldsModel.deleteOne({_id},(err) => {
    if(err){
      res.send(err);
    }
    res.send({})
  });
});
 


module.exports = router;
