var delay = require('delay');
var express = require("express");
var ethers = require("ethers");
var router = express.Router();
var cors = require("cors");
var getBalance = require('./balance')
router.use(cors());
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const ContractsModel = require("../models/mongodb/contracts");
const AccountsModel = require("../models/mongodb/accounts");

router.post("/",  async function (req, res) {
  //extract args
  let {network, contract_id,amount} = req.body;
  if(!network){console.log('missing req.body.network')}
  if(!contract_id){console.log('missing req.body.contract_id')}
  if(!amount){console.log('missing req.body.amount')}
  if(typeof(amount) !== 'number'){console.log('amount is not a valid number')}

  if(network){console.log(`req.body.network: ${network}`)}
  if(contract_id){console.log(`req.body.contract_id: ${contract_id}`)}
  if(amount){console.log(`req.body.amount: ${amount}`)}

  // get mongodb records
  let accounts = await AccountsModel.find({}).exec();
  let contract = await ContractsModel.findById(contract_id).exec();
  
  // parse mongodb records
  let contractAddress = contract.addresses[network];
  let publisherAddress = contract.publishers[network];
  if(!publisherAddress){console.log(`cannot find publisherAddress for ${network}`)}
  if(publisherAddress){console.log(`publisherAddress: ${publisherAddress}`)}

  let publisherAccount = accounts.find(x => x.address === publisherAddress);
  if(!publisherAccount){console.log(`cannot find publisher account for ${publisherAddress}`)}
  if(!publisherAccount.privateKey){console.log(`cannot find private key for ${publisherAccount.name}`)}
  if(publisherAccount){console.log(`publisherAccount.name: ${publisherAccount.name}`)}
  if(publisherAccount.address){console.log(`publisherAccount.address: ${publisherAccount.address}`)}
  if(publisherAccount.privateKey){console.log(`publisherAccount.privateKey: ${publisherAccount.privateKey}`)}

  let recipientAccounts = accounts.filter(x => x.address !== publisherAddress);
  if(!recipientAccounts){console.log(`Error: no recipient accounts found:  ${recipientAccounts}`)}
  
  let provider = ethers.getDefaultProvider(network);
  let wallet = new ethers.Wallet(publisherAccount.privateKey, provider);
  let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);

  getBalance(network,publisherAccount,contractAddress, contract, publisherAddress  )

  return res.send('distribution complete');

  });
  

module.exports = router;
