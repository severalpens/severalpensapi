var ethers = require("ethers");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var AccountsModel = require("../models/mongodb/accounts");
var ContractsModel = require("../models/mongodb/contracts");
var TransfersModel = require("../models/mongodb/transfers");
var LogsModel = require("../models/mongodb/logs");

var router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));


router.post("/", async function (req, res) {
  let txbd = req.body[0];
  let inputs = req.body[1];
    let contract = await ContractsModel.findById(txbd.contract_id);
    let abi = JSON.parse(contract.abi);
    let msgSender = await AccountsModel.findById(txbd.msgSender_id);
    let provider = ethers.getDefaultProvider(txbd.network);
    let wallet = new ethers.Wallet(msgSender.privateKey, provider);
    let ethersContract = new ethers.Contract(contract.addresses[txbd.network], abi, wallet);
    let method = ethersContract[txbd.method.name];
    let methodArgs = inputs.map(x => x.value);
    method(...methodArgs)
      .then((tx) => {
        res.json({ tx });
        let log = new LogsModel();
        log.user_id = txbd.user_id;
        log.network = txbd.network;
        log.timestamp = new Date().getTime();
        log.transaction_id = txbd._id;
        log.log = tx;
        log.save();
        tx.wait()
          .then((tx2) => {
            let log = new LogsModel();
            log.user_id = txbd.user_id;
            log.network = txbd.network;
            log.timestamp = new Date().getTime();
            log.transaction_id = txbd._id;
            log.log = tx2;
            log.save();
          })
          .catch((error) => {
            let log = new LogsModel();
            log.user_id = txbd.user_id;
            log.network = txbd.network;
            log.timestamp = new Date().getTime();
            log.transaction_id = txbd._id;
            log.log = error;
            log.save();
          });
      })
      .catch((error) => {
        res.json({ tx: error });
        let log = new LogsModel();
        log.user_id = txbd.user_id;
        log.network = txbd.network;
        log.timestamp = new Date().getTime();
        log.transaction_id = txbd._id;
        log.log = error;
        log.save();
      });

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
