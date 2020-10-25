var ethers = require("ethers");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var StepsModel = require("../_models/steps");
var LogsModel = require("../_models/logs");

var router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));


router.post("/", async function (req, res) {
  let address = req.body;
  address.user_id = req.user_id;
  let provider = new ethers.providers.InfuraProvider(address.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let balance = await provider.getBalance(address.address);
  res.send(balance);

});



module.exports = router;

/*
1: Why not the address? - Because ethers requires the abi code to create the required contract object.
Therefore its a lot easier for the server to  retreive the contract document from the database and extract both the address
and abi code rather than require the client to post it all.
*/
