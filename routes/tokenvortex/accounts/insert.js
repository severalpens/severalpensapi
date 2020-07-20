var express = require("express");
var router = express.Router();
var ethers = require("ethers");
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");
var cors = require('cors');
router.use(cors());

router.post("/", bodyParser.json(), function(req, res, next) {
  let account = req.body;
  account.user_id = req.user_id;
  account.isLocked = false;
  account.isActive = true;
  AccountsModel.create(account,(err,result) => {
      if(err){
        res.send(err);
      }
      console.log(result);
      res.send(result);
    });
  });
  

module.exports = router;