var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");


router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let account = req.body;
    account.user_id = req.user_id;
    
      AccountsModel.updateOne(
        { 
          _id: req.params._id, 
          user_id: req.user_id
         },
        account,
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