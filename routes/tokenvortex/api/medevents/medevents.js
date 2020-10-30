var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());

var deleteRouter = require("./delete");
var insertRouter = require("./insert");
var updateRouter = require("./update");

router.use('/delete',deleteRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);

const MedeventsModel = require("../../models/medevents");
router.get("/", async function(req, res, next) {
  let medevents = await MedeventsModel.find({}).exec();
  return res.send(medevents);
});

module.exports = router;
