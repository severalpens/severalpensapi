var express = require("express");
var router = express.Router();
var ethers = require("ethers");
var bodyParser = require("body-parser");
var EntitiesModel = require("../models/mongodb/entities");
var AccountsModel = require("../models/mongodb/accounts");
var cors = require('cors');
router.use(cors());

router.post("/", bodyParser.json(),async function(req, res, next) {
  let account = req.body;
  account.user_id = req.user_id;
  delete account._id;
  let accountsModel = new AccountsModel(account);
  accountsModel.save((err,result) => {
    if(err){
      console.log(err);
      res.send(err);
    }
    console.log(result);
    res.send(result);

  })
  });
  

module.exports = router;