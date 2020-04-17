var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var TransfersModel = require('../models/mongodb/transfers');
var TransactionsModel = require('../models/mongodb/transactions');

var cors = require('cors');
router.use(cors());

router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    console.log(_id);
    TransfersModel.deleteOne({_id},(err) => {
      if(err){
        console.log(err);
        res.send(err);
      }
      console.log(`about to send ${_id}`);
      res.send(_id)
    });
  });
   

  router.delete("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    TransfersModel.deleteOne({_id},(err) => {
      if(err){
        console.log(err);
        return res.send(err);
      }
      TransactionsModel.delete({transfer_id: _id},(err) => {
        if(err){
          console.log(err);
          return res.send(err);
        } 
      })
    });
  });





module.exports = router;
