var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var ContractsModel = require('../models/mongodb/contracts');



router.post("/", bodyParser.json(), function(req, res, next) {
  let contract = req.body;
  contract.user_id = req.user_id;
  contract.isActive = true;
  ContractsModel.create(contract).then(result => {
    res.send(result);
  });
});

module.exports = router;
