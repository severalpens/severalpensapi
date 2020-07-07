var express = require("express");
var ethers = require("ethers");
var router = express.Router();
var cors = require("cors");
router.use(cors());
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const ContractsModel = require("../models/mongodb/contracts");

router.post("/",  async function (req, res) {
  let contract = await ContractsModel.findById(req.body.contract_id).exec();
  let network = req.body.network;
  let contractAddress = contract.addresses[network];
  let contractPublisher = contract.publisher[network];
  let provider = ethers.getDefaultProvider(network);
    let wallet = new ethers.Wallet(process.env.privateKey, provider);
    let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);
    let accounts = await AccountsModel.find({}).exec();
    accounts.forEach(account => {
        ethersContract.transfer(account.address,1);
    });
  res.send('distribution complete');
  
});

module.exports = router;
