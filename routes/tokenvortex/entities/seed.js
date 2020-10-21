var ethers = require("ethers");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var EntitiesModel = require("../models/mongodb/entities");
const fs = require('fs-extra');
let alice = require('./alice.json');
let bob = require('./bob.json');
let btc = require('./btc.json');
let bt = require('./bt.json');
let hashPair1 = require('./hashPair1.json');
let amount = require('./amount.json');
let seedAmount = require('./seedamount.json');

const crypto = require('crypto');
var router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));
router.use(bodyParser.json({ extended: false }));

router.get("/", async function(req, res, next) {
  await EntitiesModel.deleteMany({}).exec();
  alice.user_id = req.user_id;
  let e1 = new EntitiesModel(alice);
  await e1.save();

  bob.user_id = req.user_id;
  let e2 = new EntitiesModel(bob);
  await e2.save();

  btc.user_id = req.user_id;
  let e3 = new EntitiesModel(btc);
  await e3.save();

  bt.user_id = req.user_id;
  let e4 = new EntitiesModel(bt);
  await e4.save();

  hashPair1.user_id = req.user_id;
  let e5 = new EntitiesModel(hashPair1);
  await e5.save();

  amount.user_id = req.user_id;
  let e6 = new EntitiesModel(amount);
  await e6.save();

  seedAmount.user_id = req.user_id;
  let e7 = new EntitiesModel(seedAmount);
  await e7.save();

    // let hashPair = new EntitiesModel(e5);
    // hashPair.body = newSecretHashPair();
    // hashPair  = await hashPair.save();
    // hashPair.options.push({ text: `${hashPair.name} hash`, value: hashPair.body.hash});
    // hashPair.options.push({ text: `${hashPair.name} secret`, value: hashPair.body.secret});
    // await hashPair.save();


  const query = EntitiesModel.find(); 
  query.exec((err, entities) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(entities);
      }
    });
})


const bufToStr = b => '0x' + b.toString('hex');

const sha256 = x =>
crypto
  .createHash('sha256')
  .update(x)
  .digest()

const random32 = () => crypto.randomBytes(32)

const isSha256Hash = hashStr => /^0x[0-9a-f]{64}$/i.test(hashStr)

const newSecretHashPair = () => {
const secret = random32()
const hash = sha256(secret)
return {
  secret: bufToStr(secret),
  hash: bufToStr(hash),
}
}



module.exports = router;