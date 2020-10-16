var ethers = require("ethers");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var AccountsModel = require("../models/mongodb/accounts");
var ContractsModel = require("../models/mongodb/contracts");
var StepsModel = require("../models/mongodb/steps");
var SequencesModel = require("../models/mongodb/sequences");
var LogsModel = require("../models/mongodb/logs");

var router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));
router.use(bodyParser.json({ extended: false }));

router.post("/", async function (req, res) {
  let log = new LogsModel(req.body);
  log.user_id = req.user_id;
  let contract = await ContractsModel.findById(log.step.contract_id);
  let msgSender = await AccountsModel.findById(log.step.msgSender_id);
  let provider = new ethers.providers.InfuraProvider(log.step.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let wallet = new ethers.Wallet(msgSender.privateKey, provider);
  let ethersContract = new ethers.Contract(contract.addresses[log.step.network], contract.abi, wallet);
  let method = ethersContract[log.step.method.name];
  let methodArgs = log.step.method.inputs.map(x => x.internalType);
  method(...methodArgs)
    .then(async (tx) => {
      log.tx = tx;
      if (log.step.method.stateMutability === 'view') {
        log.status = 'table-success';
      }
      else {
        log.status = 'table-warning';
        tx.wait()
          .then(async (tx2) => {
            log.tx = tx2;
            log.status = 'table-success';
          })
          .catch(async (error) => {
            log.tx = error;
            log.status = 'table-danger';
          })
          .finally(async () => {
            await log.save();
          })
      }
    })
    .catch(async (error) => {
      log.tx = error;
      log.status = 'table-danger';
    })
    .finally(async () => {
      await log.save();
      res.send(log);
    })

});

function nextPosId(current, max) {
  return current === max ? 0 : current + 1;
}

router.get("/refresh/:_id", async function (req, res) {
  let _id = req.params._id;
  TransfersModel.findOne({ _id }, (err, transfer) => {
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
