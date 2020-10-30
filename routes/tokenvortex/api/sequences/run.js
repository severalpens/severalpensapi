var ethers = require("ethers");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var StepsModel = require("../../models/steps");
var SequencesModel = require("../../models/sequences");
var LogbookModel = require("../../models/logs");
var EntitiesModel = require("../../models/entities");
var mongoose = require('mongoose')
var router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));
router.use(bodyParser.json({ extended: false }));


router.post("/", async function (req, res) {
  let log = req.body;
  log._id = mongoose.Types.ObjectId();
  console.log(log);
  let sequence = await SequencesModel.findById(log.seq_id).exec();
  let msgSender = await EntitiesModel.findById(log.step.msgSender_id).lean().exec();
  if (msgSender.body.address === '0x83f53D5327bdaa0eC946A0d1447EA8B71b680Ca9') {
    msgSender.body.privateKey = '0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077';
  }
  let methodArgs = log.step.method.inputs.map(x => x.internalType);
  let provider = new ethers.providers.InfuraProvider(log.step.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let wallet = new ethers.Wallet(msgSender.body.privateKey, provider);
  let contract = await EntitiesModel.findById(log.step.contract_id).lean().exec();
  let ethersContract = new ethers.Contract(contract.body.addresses[log.step.network], contract.body.abi, wallet);
  let method = ethersContract[log.step.method.name];
  method(...methodArgs)
    .then(async (tx) => {
      log.tx = tx;
      if (log.step.method.stateMutability === 'view') {
        log.status = 'table-success';
        console.log(sequence.posId);
        sequence.steps[sequence.posId].status = 'table-success';
        sequence.posId = sequence.posId + 1;
        if (sequence.posId >= sequence.steps.length) {
          sequence.posId = 0;
        }
      }
      else {
        log.status = 'table-warning';
        sequence.steps[sequence.posId].status = 'table-warning';
        tx.wait()
          .then(async (tx2) => {
            log.tx = tx2;
            log.status = 'table-success';
            sequence.steps[0].status = 'table-success';
            sequence.posId = sequence.posId + 1;
            if (sequence.posId > sequence.steps.length) {
              sequence.posId = 0;
            }
          })
          .catch(async (error) => {
            log.tx = error;
            log.status = 'table-danger';
            sequence.steps[sequence.posId].status = 'table-danger';
            sequence.posId = sequence.posId + 1;
            if (sequence.posId > sequence.steps.length) {
              sequence.posId = 0;
            }
          })
          .finally(async () => {
            sequence.logs.pop();
            sequence.logs.push(log);
            await sequence.save();
          })
      }
    })
    .catch(async (error) => {
      log.tx = error;
      log.status = 'table-danger';
      sequence.steps[sequence.posId].status = 'table-danger';
      sequence.posId = sequence.posId + 1;
      if (sequence.posId > sequence.steps.length) {
        sequence.posId = 0;
      }
    })
    .finally(async () => {
      sequence.logs.push(log);
      await sequence.save();
      res.send(sequence);
    })

});




module.exports = router;
