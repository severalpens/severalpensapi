var express = require("express");
var router = express.Router();
var cors = require("cors");
router.use(cors());
var bodyParser = require("body-parser");
var ContractsModel = require("../models/mongodb/contracts");
var BlockchainQuery = require("../models/blockchainQuery");

router.post("/", bodyParser.json(), function (req, res, next) {
  let props = req.body;
  let {network,contractAddress} = props;
  let q1 = ContractsModel.findOne({});
  q1.select("abi");
  q1.where(`addresses.${network}`).equals(contractAddress);
  q1.exec((err, result) => {  
    let blockchainQuery = new BlockchainQuery(network, contractAddress,result.abi);
    blockchainQuery.run(props,res);
  });
});


router.post("/balances", bodyParser.json(), function (req, res, next) {
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
});




module.exports = router;

/*
1: Why not the address? - Because ethers requires the abi code to create the required contract object.
Therefore its a lot easier for the server to  retreive the contract document from the database and extract both the address
and abi code rather than require the client to post it all.
*/
