const btc = require('./utils/btc.json');
const express = require("express");
const router = express.Router();
const admin = require('../../seed/seedFiles/admin.json');
const admin_id = '5f8f88e5d28b37394459bbba';
const cors = require('cors');
router.use(cors());
const bodyParser = require("body-parser");
const BtcModel = require("../../models/btc");
const initializeRouter = require("./initialize");
const settingsRouter = require("./settings");
const transferRouter = require("./transfer");

router.use('/initialize',initializeRouter);
router.use('/settings',settingsRouter);
router.use('/transfer',transferRouter);

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

router.get("/addresses", async function(req, res, next) {
  let addresses = [
    {network: 'ropsten',address: btc.body.addresses.ropsten},
   {network: 'kovan',address: btc.body.addresses.kovan},
   {network: 'rinkeby',address: btc.body.addresses.rinkeby},
  {network: 'goerli',address: btc.body.addresses.goerli}
]
  res.send(addresses)
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



module.exports = router;
