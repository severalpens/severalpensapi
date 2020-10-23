var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../models/mongodb/entities');
const crypto = require('crypto');
const ethers = require('ethers');


router.post("/", bodyParser.json(), function(req, res, next) {
  let entity = req.body;
  entity.user_id = req.user_id;
  entity.isActive = true;

  if(entity.entityType === 'hashPair'){
    entity.body = newSecretHashPair();
  }

  if(entity.entityType === 'randomAccount'){
    let randomAccount = ethers.Wallet.createRandom();
    console.log(randomAccount);
    let body = {};
    body.address  = randomAccount.address;
    body.privateKey = randomAccount.privateKey;
    entity.body = body;
  }

  console.log(entity);

  EntitiesModel.create(entity).then(result => {
    res.send(result);
  });

});

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
