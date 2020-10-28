var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../../models/entities');
const admin_id = '5f8f88e5d28b37394459bbba';

router.post("/", bodyParser.json(), async function (req, res, next) {
  let deploy = req.body;
  let contract = await EntitiesModel.findById(deploy.contract_id).lean().exec();
  let provider = new ethers.providers.InfuraProvider(deploy.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let wallet = new ethers.Wallet('0xa2e19e3c8580f31b13ad31fa1638a503bfc6771be57eb1952b3f9416ad07194a', provider);
  let factory = new ethers.ContractFactory(contract.body.abi, contract.body.bytecode, wallet);
  let contract = await factory.deploy(1000);
  contract.deployed();
  res.send(contract.address);


});


module.exports = router;
