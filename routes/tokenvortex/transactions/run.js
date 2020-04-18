var express = require("express");
var router = express.Router();
var cors = require("cors");
router.use(cors());
var bodyParser = require("body-parser");
var ContractsModel = require("../models/mongodb/contracts");
var BlockchainQuery = require("../models/blockchainQuery");

router.get("/test", bodyParser.json(), function (req, res, next) {

  let addressNetwork = `addresses.${req.query.network}`;
  let contractAddress = req.query.contractAddress;
  let tmp = {...props} = req.query;

  let q1 = ContractsModel.find({});
  q1.select("_id addresses");
  q1.where(addressNetwork).equals(contractAddress);
  q1.exec((err, response) => {
    res.send(response);
  });
});




router.post("/transaction", bodyParser.json(), function (req, res, next) {
  let props = req.body;
  let network = req.body.network;
  let contractAddress = req.body.contractAddress;


  let q1 = ContractsModel.find({});
  q1.select("abi");
  q1.where(`addresses.${network}`).equals(contractAddress);
  q1.exec((err, abi) => {
    let blockchainQuery = new BlockchainQuery(props, abi);
    switch (req.body.stage) {
      case "balanceOf":
        blockchainQuery.balanceOf(res);
        break;
      case "balanceOfAvailable":
        blockchainQuery.balanceOfAvailable(res);
        break;
      case (0, 1):
        blockchainQuery.externalTransferInit(res);
        break;
      case 2:
        blockchainQuery.externalTransferSyn(res);
        break;
      case 3:
        blockchainQuery.externalTransferSynAck(res);
        break;
      case 4:
        blockchainQuery.externalTransferAck(res);
        break;

      default:
        break;
    }
  });
});

router.post("/balanceof", bodyParser.json(), function (req, res, next) {
  let _id = req.body.contract_id; //See note: 1
  ContractsModel.findOne({ _id }, (err, mongoContract) => {
    let blockchainQuery = new BlockchainQuery(req.body, mongoContract);
    blockchainQuery.balanceOf(req.body.accountAddress, res);
  });
});

router.post("/balanceofavailable", bodyParser.json(), function (
  req,
  res,
  next
) {
  let _id = req.body.contract._id; //See note: 1
  ContractsModel.findOne({ _id }, (err, mongoContract) => {
    let blockchainQuery = new BlockchainQuery(req.body, mongoContract);
    blockchainQuery.balanceOfAvailable(req.body.account.address, res);
  });
});

module.exports = router;

/*
1: Why not the address? - Because ethers requires the abi code to create the required contract object.
Therefore its a lot easier for the server to  retreive the contract document from the database and extract both the address
and abi code rather than require the client to post it all.
*/
