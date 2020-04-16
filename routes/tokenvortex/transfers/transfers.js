var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var insertRouter = require("./insert");
var deleteRouter = require("./delete");
var updateRouter = require("./update");

var cors = require('cors');
router.use(cors());


router.use('/insert',insertRouter);
router.use('/update',updateRouter);
router.use('/delete',deleteRouter);

var TransfersModel = require('../models/mongodb/transfers');


router.get("/", bodyParser.json(), function(req, res, next) {
  TransfersModel.find()
    .collection(TransfersModel.collection)
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
