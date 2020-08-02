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

var TxbdsModel = require('../models/mongodb/txbds');

router.get("/:tfrbd_id", bodyParser.json(), function(req, res, next) {
  TxbdsModel.find({tfrbd_id: req.params.tfrbd_id})
    .collection(TxbdsModel.collection)
    .exec((err, txbds) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        console.log('txbds');
        console.log(txbds);
        return res.send(txbds);
      }
    });
});

module.exports = router;
