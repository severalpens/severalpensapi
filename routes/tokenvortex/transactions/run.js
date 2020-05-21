var express = require("express");
var router = express.Router();
var ethers = require("ethers");
var ContractsModel = require("../models/mongodb/contracts");
var BlockchainQuery = require("../models/blockchainQuery");
var TransactionProtocol = require("../models/transactionProtocol");
var cors = require('cors');
router.use(cors());

function newEthersContract(network,contractAddress,abi){
  let provider = ethers.getDefaultProvider(network);
  let wallet = new ethers.Wallet(process.env.privateKey, provider);
  let ethersContract = new ethers.Contract(
    contractAddress,
    JSON.parse(abi),
    wallet
  ); 
  return  ethersContract; 
}

router.post("/transactionprotocol", function (req, res) {
  try {
    let props = req.body;
    let {senderNetwork,recipientNetwork, contract_id} = props;
    let q1 = ContractsModel.findOne({_id: contract_id});
    q1.exec((err, contract) => {  
      let exitContract = newEthersContract(senderNetwork, contract.addresses[senderNetwork], contract.abi);
      let entryContract = newEthersContract(recipientNetwork, contract.addresses[recipientNetwork], contract.abi);
      let tx = new TransactionProtocol(exitContract, entryContract,props);
      tx.run(res);
    });
} catch (error) {
    res.status(404).send(error);
}
});


router.post("/", function (req, res) {
  try {
    let props = req.body;
    let {network,contractAddress} = props;
    let q1 = ContractsModel.findOne({});
    q1.select("abi");
    q1.where(`addresses.${network}`).equals(contractAddress);
    q1.exec((err, result) => {  
      let blockchainQuery = new BlockchainQuery(network, contractAddress,result.abi);
      blockchainQuery.run(props,res);
    });
} catch (error) {
    res.status(404).send(error);
}
});


router.post("/balances",  function (req, res) {
  try {

  let props = req.body;
  props.stage = 100;
  let {network,contractAddress} = props;
  let q1 = ContractsModel.findOne({});
  q1.select("abi");
  q1.where(`addresses.${network}`).equals(contractAddress);
  q1.exec((err, result) => {  
    let blockchainQuery = new BlockchainQuery(network, contractAddress,result.abi);
    blockchainQuery.run(props,res);
  });
} catch (error) {
  res.status(404).send(error);
}

});




module.exports = router;

/*
1: Why not the address? - Because ethers requires the abi code to create the required contract object.
Therefore its a lot easier for the server to  retreive the contract document from the database and extract both the address
and abi code rather than require the client to post it all.
*/
