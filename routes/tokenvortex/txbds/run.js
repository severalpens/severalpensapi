var express = require("express");
var cors = require("cors");
var router = express.Router();
router.use(cors());
var bodyParser = require("body-parser");
router.use(bodyParser.json());
var ContractsModel = require("../models/mongodb/contracts");
var TransfersModel = require("../models/mongodb/transfers");
var BlockchainQuery = require("../models/ethers/blockchainQuery");
var HtlcQuery = require("../models/ethers/htlcQuery");
router.use(cors());
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));


router.post("/", async function (req, res) {
  try {
    let txbd = req.body;
    txbd.user_id = req.user_id;
    let { network, contractAddress, runVersion } = txbd;
    let q1 = ContractsModel.findOne({});
    q1.select("abi");
    q1.where(`addresses.${network}`).equals(contractAddress);
    q1.exec((err, abi) => {
      abiJson = JSON.parse(abi.abi);
      switch (runVersion) {
        case 1:
          let htlcQuery = new HtlcQuery(txbd,abiJson,res);
          htlcQuery.run(res);
          break;
              
        default:
          let blockchainQuery = new BlockchainQuery(txbd,abiJson,res);
          blockchainQuery.run(res);
          break;

      }
    });
    } 
    catch (error) {
      res.json({tx: error, burnAddress: '0x0'});
    }
});


router.get("/refresh/:_id",  async function (req, res) {
  let _id = req.params._id;
  TransfersModel.findOne({_id},(err,transfer) => {
    res.send(transfer)
  })
})




router.post("/balances", function (req, res) {
  try {
    let props = req.body;
    props.stage = 100;
    let { network, contractAddress } = props;
    let q1 = ContractsModel.findOne({});
    q1.select("abi");
    q1.where(`addresses.${network}`).equals(contractAddress);
    q1.exec((err, result) => {
      let blockchainQuery = new BlockchainQuery(
        network,
        contractAddress,
        result.abi
      );
      blockchainQuery.run(props, res);
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
