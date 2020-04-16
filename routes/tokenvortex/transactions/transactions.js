var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var insertRouter = require("./insert");
var updateRouter = require("./update");

var cors = require('cors');
router.use(cors());


router.use('/insert',insertRouter);
router.use('/update',updateRouter);

var TransactionsModel = require('../models/mongodb/transactions');

router.get("/", bodyParser.json(), function(req, res, next) {
  TransactionsModel.find({})
    .collection(TransactionsModel.collection)
    .exec((err, contracts) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(contracts);
      }
    });
});

module.exports = router;
