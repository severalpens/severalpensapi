var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");


router.post("/:_id", bodyParser.json(), function(req, res, next) {
  // console.log(req.params);
  // console.log(req.user_id);
  // console.log(req.body);
      AccountsModel.updateOne(
        { 
          _id: req.params._id, 
          isLocked: false, 
          user_id: req.user_id
         },
        {
          name: req.body.name,
          address: req.body.address,
          privateKey: req.body.privateKey,
        },
      )
      .exec((err,result) => {
        if(err){
          console.log(err);
          res.send(err)
        }
        console.log(result);
        res.send(result)
      });
  });
  

module.exports = router;