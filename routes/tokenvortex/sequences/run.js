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
  let msgSender = {};
  if(log.step.msgSender_id === 'admin'){
    msgSender = {privateKey: '0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077'};
  }
  else{
    msgSender = await AccountsModel.findById(log.step.msgSender_id);
  }
  
  let provider = new ethers.providers.InfuraProvider(log.step.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');  
  let wallet = new ethers.Wallet(msgSender.privateKey, provider);
  let contract = await ContractsModel.findById(log.step.contract_id);
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



router.post("/test", async function (req, res) {
  let user_id = req.user_id;
  let step = req.body;
  let msgSender = {};

  if(step.msgSender_id === 'admin'){
    msgSender = {privateKey: '0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077'};
  }
  else{
    msgSender = await AccountsModel.findById(step.msgSender_id);
  }
  
  let provider = new ethers.providers.InfuraProvider(step.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');  
  let wallet = new ethers.Wallet(msgSender.privateKey, provider);
  let contract = await ContractsModel.findById(step.contract_id);
  let ethersContract = new ethers.Contract(contract.addresses[step.network], contract.abi, wallet);
  let method = ethersContract[step.method.name];
  let methodArgs = step.method.inputs.map(x => x.internalType);
  let result = {};
  method(...methodArgs)
    .then(async (tx) => {
      if (step.method.stateMutability === 'view') {
        res.send(tx);
      }
      else {
        tx.wait()
          .then(async (tx2) => {
            res.send(tx2);
          })
          .catch(async (error) => {
            res.send(error);
          })
      }
    })
    .catch(async (error) => {
      res.send(error);
    })
});


module.exports = router;
