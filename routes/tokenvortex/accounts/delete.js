var express = require("express");
var router = express.Router();
var ethers = require("ethers");
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");
var EntitiesModel = require("../models/mongodb/entities");
var cors = require('cors');
router.use(cors());


router.post("/:_id", bodyParser.json(),async  function(req, res, next) {
    let _id = req.params._id;
    let user_id = req.user_id;
   let result =  await AccountsModel
   .findByIdAndDelete(_id)
   .where(user_id)
   .exec();
   return res.send(result);

});
  

module.exports = router;