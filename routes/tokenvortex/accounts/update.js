var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var AccountsModel = require("../models/mongodb/accounts");
var cors = require('cors');
router.use(cors());

router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    console.log(_id);
      AccountsModel.updateOne(
        { _id, locked: false },
        {
          name: req.body.name,
          address: req.body.address,
          privateKey: req.body.privateKey,
          publicKey: req.body.publicKey,
          mnemonic: req.body.mnemonic,
          // locked: req.body.locked == "on"
        },
      ).exec((err,result) => {
        if(err){res.send(err)}
        res.send(result)
      });
  });
  

module.exports = router;