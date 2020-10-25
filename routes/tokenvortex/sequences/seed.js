var ethers = require("ethers");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var EntitiesModel = require("../_models/entities");
var StepsModel = require("../_models/steps");
var SequencesModel = require("../_models/sequences");
var LogsModel = require("../_models/logs");
var contractTemplate = require('./seed/btc.json');

var router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));
router.use(bodyParser.json({ extended: false }));

router.get("/", async function(req, res, next) {

  let alice = new EntitiesModel();
  let random1 = ethers.Wallet.createRandom();
  alice.user_id = req.user_id;
  alice.name = 'Alice';
  alice.body = {};
  alice.body.address = random1.address;
  alice.body.privateKey = random1.privateKey;
  isLocked = false;
  isActive = true;
  await alice.save();

  let bob = new EntitiesModel();
  let random2 = ethers.Wallet.createRandom();
  bob.user_id = req.user_id;
  bob.name = 'Bob';
  bob.body = {};
  bob.body.address = random2.address;
  bob.body.privateKey = random2.privateKey;
  await bob.save();

  let btc = new EntitiesModel();
  btc.body = {};
  btc.body.addresses = contractTemplate.addresses;
  btc.name = contractTemplate.name;
  btc.body.symbol = contractTemplate.symbol;
  btc.body.version  = contractTemplate.version;
  btc.body.description = contractTemplate.description;
  btc.user_id = req.user_id;
  btc.body.soliditycode = contractTemplate.soliditycode;
  btc.body.abi = contractTemplate.abi;
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