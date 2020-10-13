var ethers = require("ethers");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var AccountsModel = require("../models/mongodb/accounts");
var ContractsModel = require("../models/mongodb/contracts");
var StepsModel = require("../models/mongodb/steps");
var LogsModel = require("../models/mongodb/logs");

var router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));


router.post("/", async function (req, res) {
  let step = req.body;
  step.user_id = req.user_id;
    let contract = await ContractsModel.findById(step.contract_id);
    // let abi = JSON.parse(contract.abi);
    let msgSender = await AccountsModel.findById(step.msgSender_id);
    let provider = new ethers.providers.InfuraProvider(step.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
    let wallet = new ethers.Wallet(msgSender.privateKey, provider);
    let ethersContract = new ethers.Contract(contract.addresses[step.network], contract.abi, wallet);
    let method = ethersContract[step.method.name];
    let methodArgs = step.method.inputs.map(x => x.internalType);
    method(...methodArgs)
      .then((tx) => {
        res.json({ tx });
        let log = new LogsModel();
        log.user_id = step.user_id;
        log.network = step.network;
        log.timestamp = new Date().getTime();
        log.transaction_id = step._id;
        log.log = tx;
        log.save();
        tx.wait()
          .then((tx2) => {
            let log = new LogsModel();
            log.user_id = step.user_id;
            log.network = step.network;
            log.timestamp = new Date().getTime();
            log.transaction_id = step._id;
            log.log = tx2;
            log.save();
          })
          .catch((error) => {
            let log = new LogsModel();
            log.user_id = step.user_id;
            log.network = step.network;
            log.timestamp = new Date().getTime();
            log.transaction_id = step._id;
            log.log = error;
            log.save();
          });
      })
      .catch((error) => {
        let log = new LogsModel();
        log.user_id = step.user_id;
        log.network = step.network;
        log.timestamp = new Date().getTime();
        log.transaction_id = step._id;
        log.log = error;
        log.save();
        res.json({ tx: error });
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
