var express = require("express");
var router = express.Router();
var admin = require('../../seed/seedFiles/admin.json')
const admin_id = '5f8f88e5d28b37394459bbba';
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var deleteRouter = require("./delete");
var insertRouter = require("./insert");
var updateRouter = require("./update");
var deployRouter = require("./deploy");

router.use('/delete',deleteRouter);
router.use('/deploy',deployRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);

const BtcModel = require("../../models/btc");


router.get("/", async function(req, res, next) {
  let user_id = req.user_id;
  const query = BtcModel.find({});
  query.or([{ user_id }, { _id: admin_id }])
  query.exec((err, btc) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(btc);
      }
    });
});




router.get("/update", async function(req, res, next) {
  let user_id = req.user_id;
  const query = BtcModel.find({});
  query.or([{ user_id }, { _id: admin_id }])
  query.exec((err, btc) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(btc);
      }
    });
});




router.get("/run", async function(req, res, next) {
  let user_id = req.user_id;
  const query = BtcModel.find({});
  query.or([{ user_id }, { _id: admin_id }])
  query.exec((err, btc) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(btc);
      }
    });
});



module.exports = router;
