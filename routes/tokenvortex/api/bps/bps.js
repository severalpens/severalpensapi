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

const BpsModel = require("../../models/bps");
router.get("/", async function(req, res, next) {
  let bps = await BpsModel.find({}).exec();
  return res.send(bps);
});

module.exports = router;
