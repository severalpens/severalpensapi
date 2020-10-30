var express = require("express");
var router = express.Router();
var cors = require('cors');
const ethers = require('ethers')

router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../../models/entities');
const admin_id = '5f8f88e5d28b37394459bbba';

router.post("/:contract_id", bodyParser.json(), async function (req, res, next) {
  let deploy = req.body;
  let contract = await EntitiesModel.findById(req.params.contract_id).lean().exec();
  let bytecode = JSON.parse(contract.body.bytecode);
  let provider = new ethers.providers.InfuraProvider(deploy.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let privateKey = deploy.msgSender.body.privateKey;
  if(deploy.msgSender._id === '5f8f88e5d28b37394459bbba'){
    privateKey = '0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077';
  }
  let wallet = new ethers.Wallet(privateKey, provider);
  let factory = new ethers.ContractFactory(contract.body.abi, bytecode.object, wallet);
  let args = deploy.inputs.map(x => x.value);
  let tx = await factory.deploy(...args);
  tx.deployed();
  res.json(tx);


});


module.exports = router;
