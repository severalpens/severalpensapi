var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TransactionsModel = require('../models/mongodb/transactions');


router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    TransactionsModel.deleteOne({_id},(err) => {
      if(err){
        res.send(err);
      }
      res.send(_id);
    });
  });
   

  router.delete("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    TransactionsModel.deleteOne({_id},(err) => {
      if(err){
        res.send(err);
      }
      res.send(_id)
    });
  });
   





module.exports = router;