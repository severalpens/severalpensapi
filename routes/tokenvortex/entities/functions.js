var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../_models/entities');
const crypto = require('crypto');
const ethers = require('ethers');
var functions = {};

function customise(entity) {
  if (entity.entityType === 'hashPair') {
    entity.body = newSecretHashPair();
  }
  if (entity.entityType === 'randomAccount') {
    entity.body = newRandomAccount();
  }
  return entity;
}

function newRandomAccount() {
  let randomAccount = ethers.Wallet.createRandom();
  let body = {};
  body.address = randomAccount.address;
  body.privateKey = randomAccount.privateKey;
  return body;
}

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


functions.customise = customise;
functions.newRandomAccount = newRandomAccount;
functions.newSecretHashPair = newSecretHashPair;
module.exports = functions;