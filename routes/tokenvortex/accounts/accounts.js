var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var EntitiesModel = require("../models/mongodb/entities");
var AccountsModel = require("../models/mongodb/accounts");
var deleteRouter = require("./delete");
var lockRouter = require("./lock");
var insertRouter = require("./insert");
var newRouter = require("./new");
var updateRouter = require("./update");
var cors = require('cors');
router.use(cors());
router.use('/delete',deleteRouter);
router.use('/lock',lockRouter);
router.use('/insert',insertRouter);
router.use('/new',newRouter);
router.use('/update',updateRouter);

router.get("/", async  function(req, res, next) {
  let user_id = req.user_id;
  let entityType = 'account';
  const accounts = await AccountsModel
  .find({user_id, entityType})
  .exec();
  res.send(accounts); 
});

router.get("/:_id", async  function(req, res, next) {
  let _id = req.params._id;
  let user_id = req.user_id;
  const account = await AccountsModel
    .findById(_id)
    .where({user_id})
    .exec();
    res.send(account); 
});

module.exports = router;

