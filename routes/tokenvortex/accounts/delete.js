var express = require("express");
var router = express.Router();
var ethers = require("ethers");
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");
var cors = require('cors');
router.use(cors());


router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    AccountsModel.updateOne({ _id, owner: req._id }, { isActive: false }, (err,result) => {
      if(err) {return res.send(err)}
      return res.send(result);
    });
});
  

module.exports = router;