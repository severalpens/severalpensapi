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
  let {network, contract_id,senderAddress, recipientAddress, amount} = req.body;
  // if(!network){console.log('missing req.body.network')}
  // if(!contract_id){console.log('missing req.body.contract_id')}
  // if(!amount){console.log('missing req.body.amount')}
  // if(typeof(amount) !== 'number'){console.log('amount is not a valid number')}

  // if(network){console.log(`req.body.network: ${network}`)}
  // if(contract_id){console.log(`req.body.contract_id: ${contract_id}`)}
  // if(amount){console.log(`req.body.amount: ${amount}`)}

  // get mongodb records
  let accounts = await AccountsModel.find({}).exec();
  let contract = await ContractsModel.findById(contract_id).exec();
  
  // parse mongodb records
  let contractAddress = contract.addresses[network];
  let publisherAddress = contract.publishers[network];
  // if(!publisherAddress){console.log(`cannot find publisherAddress for ${network}`)}
  // if(publisherAddress){console.log(`publisherAddress: ${publisherAddress}`)}

  let publisherAccount = accounts.find(x => x.address === publisherAddress);
  // if(!publisherAccount){console.log(`cannot find publisher account for ${publisherAddress}`)}
  // if(!publisherAccount.privateKey){console.log(`cannot find private key for ${publisherAccount.name}`)}
  // if(publisherAccount){console.log(`publisherAccount.name: ${publisherAccount.name}`)}
  // if(publisherAccount.address){console.log(`publisherAccount.address: ${publisherAccount.address}`)}
  // if(publisherAccount.privateKey){console.log(`publisherAccount.privateKey: ${publisherAccount.privateKey}`)}

  let recipientAccounts = accounts.filter(x => x.address !== publisherAddress);
  // if(!recipientAccounts){console.log(`Error: no recipient accounts found:  ${recipientAccounts}`)}
  
  let provider = ethers.getDefaultProvider(network);
  let wallet = new ethers.Wallet(publisherAccount.privateKey, provider);
  let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);

  let hexBalance = await ethersContract.balanceOf(senderAddress);
  let balance = hexBalance.toNumber();
  // console.log(balance);

  if(balance >= amount){
    let transfer =  await ethersContract.transfer(recipientAddress,amount);
    return res.send(transfer);
  }

  return res.send('failed');


  });


  
router.post("/senderbalance",  async function (req, res) {
  //extract args
  let {network, contract_id,senderAddress,  amount} = req.body;
  // if(!network){console.log('missing req.body.network')}
  // if(!senderAddress){console.log('missing req.body.senderAddress')}
  // if(!contract_id){console.log('missing req.body.contract_id')}
  // if(!amount){console.log('missing req.body.amount')}
  // if(typeof(amount) !== 'number'){console.log('amount is not a valid number')}
  // if(network){console.log(`req.body.network: ${network}`)}
  // if(contract_id){console.log(`req.body.contract_id: ${contract_id}`)}
  // if(amount){console.log(`req.body.amount: ${amount}`)}

  // get mongodb records
  let accounts = await AccountsModel.find({}).exec();
  let contract = await ContractsModel.findById(contract_id).exec();
  
  // parse mongodb records
  let contractAddress = contract.addresses[network];
  // if(senderAddress){console.log(`senderAddress: ${senderAddress}`)}

  let senderAccount = accounts.find(x => x.address === senderAddress);
  // if(!senderAccount){console.log(`cannot find sender account for ${senderAddress}`)}
  // if(!senderAccount.privateKey){console.log(`cannot find private key for ${senderAccount.name}`)}
  // if(senderAccount){console.log(`senderAccount.name: ${senderAccount.name}`)}
  // if(senderAccount.address){console.log(`senderAccount.address: ${senderAccount.address}`)}
  // if(senderAccount.privateKey){console.log(`senderAccount.privateKey: ${senderAccount.privateKey}`)}
  
  let provider = ethers.getDefaultProvider(network);
  let wallet = new ethers.Wallet(senderAccount.privateKey, provider);
  let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);

  let hexBalance = await ethersContract.balanceOf(senderAddress);
  let balance = hexBalance.toNumber();
  return res.json(balance);
  
  });

  
router.post("/recipientbalance",  async function (req, res) {
  //extract args
  let {network, contract_id,recipientAddress,  amount} = req.body;
  // if(!network){console.log('missing req.body.network')}
  // if(!recipientAddress){console.log('missing req.body.recipientAddress')}
  // if(!recipientAddress){console.log('missing req.body.recipientAddress')}
  // if(!contract_id){console.log('missing req.body.contract_id')}
  // if(!amount){console.log('missing req.body.amount')}
  // if(typeof(amount) !== 'number'){console.log('amount is not a valid number')}
  // if(network){console.log(`req.body.network: ${network}`)}
  // if(contract_id){console.log(`req.body.contract_id: ${contract_id}`)}
  // if(amount){console.log(`req.body.amount: ${amount}`)}

  // get mongodb records
  let accounts = await AccountsModel.find({}).exec();
  let contract = await ContractsModel.findById(contract_id).exec();
  
  // parse mongodb records
  let contractAddress = contract.addresses[network];
  // if(recipientAddress){console.log(`recipientAddress: ${recipientAddress}`)}

  let recipientAccount = accounts.find(x => x.address === recipientAddress);
  // if(!recipientAccount){console.log(`cannot find recipient account for ${recipientAddress}`)}
  // if(!recipientAccount.privateKey){console.log(`cannot find private key for ${recipientAccount.name}`)}
  // if(recipientAccount){console.log(`recipientAccount.name: ${recipientAccount.name}`)}
  // if(recipientAccount.address){console.log(`recipientAccount.address: ${recipientAccount.address}`)}
  // if(recipientAccount.privateKey){console.log(`recipientAccount.privateKey: ${recipientAccount.privateKey}`)}
  
  let provider = ethers.getDefaultProvider(network);
  let wallet = new ethers.Wallet(recipientAccount.privateKey, provider);
  let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);

  let hexBalance = await ethersContract.balanceOf(recipientAddress);
  let balance = hexBalance.toNumber();
  return res.json(balance);
  
  });


  
router.post("/refreshbalance",  async function (req, res) {
  //extract args
  let {network, contract_id,account_id} = req.body;
  // if(!network){console.log('missing req.body.network')}
  // if(!account_id){console.log('missing req.body.account_id')}
  // if(!contract_id){console.log('missing req.body.contract_id')}
  // if(network){console.log(`req.body.network: ${network}`)}
  // if(contract_id){console.log(`req.body.contract_id: ${contract_id}`)}
  // if(account_id){console.log(`req.body.account_id: ${account_id}`)}

  // get mongodb records
  let account = await AccountsModel.findById(account_id).exec();
  let contract = await ContractsModel.findById(contract_id).exec();
  // if(!account.address){console.log('missing account.address')}
  // if(!account.privateKey){console.log('missing account.privateKey')}
  

  // parse mongodb records
  let contractAddress = contract.addresses[network];
  // if(!contractAddress){console.log('missing contractAddress')}

  let provider = ethers.getDefaultProvider(network);
  let wallet = new ethers.Wallet(account.privateKey, provider);
  let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);

  let hexBalance = await ethersContract.balanceOf(account.address);
  let balance = hexBalance.toNumber();
  return res.json(balance);
  
  });

module.exports = router;
