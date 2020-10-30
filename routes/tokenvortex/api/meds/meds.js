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

const MedsModel = require("../../models/meds");
router.get("/", async function(req, res, next) {
  let meds = await MedsModel.find({}).exec();
  return res.send(meds);
});

module.exports = router;
