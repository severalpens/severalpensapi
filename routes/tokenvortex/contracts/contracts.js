var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var ContractsModel = require('../models/mongodb/contracts');
var deleteRouter = require("./delete");
var lockRouter = require("./lock");
var insertRouter = require("./insert");
var updateRouter = require("./update");
var cors = require('cors');
router.use(cors());
router.use('/lock',lockRouter);
router.use('/delete',deleteRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);

router.get("/", async  function(req, res, next) {
  let user_id = req.user_id;
  const contracts = await ContractsModel.find({user_id}).exec();
  res.send(contracts); 
});

router.get("/:_id", async  function(req, res, next) {
  let _id = req.params._id;
  let user_id = req.user_id;
  const contract = await ContractsModel
    .findById(_id)
    .where({user_id})
    .exec();
    res.send(contract); 
});

module.exports = router;
