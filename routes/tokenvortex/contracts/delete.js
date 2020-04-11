var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var ContractsModel = require('../../models/mongodb/contracts');

var cors = require('cors');
router.use(cors());




router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    ContractsModel.updateOne({ _id }, { isActive: false }).then(result => {
      return res.send(result);
    });
  });
  
    




module.exports = router;
