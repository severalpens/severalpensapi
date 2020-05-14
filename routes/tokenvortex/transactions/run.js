var express = require("express");
var router = express.Router();
var ContractsModel = require("../models/mongodb/contracts");
var BlockchainQuery = require("../models/blockchainQuery");

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
