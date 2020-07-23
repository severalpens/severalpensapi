var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));

var insertRouter = require("./insert");
var updateRouter = require("./update");
var deleteRouter = require("./delete");
var runRouter = require("./run");
var distributeRouter = require("./distribute");

router.use(cors());


router.use('/insert',insertRouter);
router.use('/update',updateRouter);
router.use('/delete',deleteRouter);
router.use('/run',runRouter);
router.use('/distribute',distributeRouter);

var TransactionsModel = require('../models/mongodb/transactions');

router.get("/:transfer_id", bodyParser.json(), function(req, res, next) {
  TransactionsModel.find({transfer_id: req.params.transfer_id})
    .collection(TransactionsModel.collection)
    .exec((err, transactions) => {
      if (err != null) {
        return res.send(err);
      } 
      else {

        return res.send(transactions);
      }
    });
});

module.exports = router;
