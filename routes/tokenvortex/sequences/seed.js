var ethers = require("ethers");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var AccountsModel = require("../models/mongodb/accounts");
var ContractsModel = require("../models/mongodb/contracts");
var StepsModel = require("../models/mongodb/steps");
var SequencesModel = require("../models/mongodb/sequences");
var LogsModel = require("../models/mongodb/logs");
var contractTemplate = require('./btc.json');

var router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));
router.use(bodyParser.json({ extended: false }));

router.get("/", async function(req, res, next) {

  let alice = new AccountsModel();
  let random1 = ethers.Wallet.createRandom();
  alice.user_id = req.user_id;
  alice.name = 'Alice';
  alice.address = random1.address;
  alice.privateKey = random1.privateKey;
  isLocked = false;
  isActive = true;
  await alice.save();

  let bob = new AccountsModel();
  let random2 = ethers.Wallet.createRandom();
  bob.user_id = req.user_id;
  bob.name = 'Bob';
  bob.address = random2.address;
  bob.privateKey = random2.privateKey;
  isLocked = false;
  isActive = true;
  await bob.save();

  let btc = new ContractsModel();
  btc.addresses = contractTemplate.addresses;
  btc.name = contractTemplate.name;
  btc.symbol = contractTemplate.symbol;
  btc.version  = contractTemplate.version;
  btc.description = contractTemplate.description;
  btc.user_id = req.user_id;
  btc.soliditycode = contractTemplate.soliditycode;
  btc.abi = contractTemplate.abi;
  btc.isActive = true;
  btc.fungible = true;
  await btc.save();


  const query = SequencesModel.find(); 
  query.or([{ user_id: req.user_id }])
  query.where('isActive').equals(true)
  query.exec((err, sequences) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(sequences);
      }
    });


})
module.exports = router;