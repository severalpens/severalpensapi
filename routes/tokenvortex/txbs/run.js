var express = require("express");
var cors = require("cors");
var router = express.Router();
router.use(cors());
var bodyParser = require("body-parser");
router.use(bodyParser.json());
var ContractsModel = require("../models/mongodb/contracts");
var TransfersModel = require("../models/mongodb/transfers");
var BlockchainQuery = require("../models/ethers/tbxBlockchainQuery");
var HtlcQuery = require("../models/ethers/htlcQuery");
var TransactionProtocol = require("../models/ethers/transactionProtocol");
router.use(cors());
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));


router.post("/", async function (req, res) {
  // try {
    let {transfer, txb} = req.body;
    transfer.user_id = req.user_id;
    txb.user_id = req.user_id;
    let network = transfer[txb.networkProp.toString()];

    let q1 = ContractsModel.findById(transfer.contract_id);
    q1.exec((err, contract) => {
      let blockchainQuery = new BlockchainQuery(contract, transfer,txb,  network);
      blockchainQuery.run(res);
    });
    // } 
    // catch (error) {
    //   res.json({tx: error, burnAddress: '0x0'});
    // }
});


router.post("/transactionprotocol",  async function (req, res) {
  let transfersModel = new TransfersModel();
  transfersModel.status = 'running';
  transfersModel.contract_id = req.body.contract_id;
  transfersModel.senderNetwork = req.body.senderNetwork;
  transfersModel.senderAddress = req.body.senderAddress;
  transfersModel.recipientNetwork = req.body.recipientNetwork;
  transfersModel.recipientAddress = req.body.recipientAddress;
  transfersModel.logbook = req.body.logbook;
  transfersModel.amount = parseInt(req.body.amount) || 1;
  let transactionProtocol = new TransactionProtocol(transfersModel);
  transfersModel = await transfersModel.save();

  //Run the transfer asyncronously to avoid timeout problems. Results will be stored in the db.
  runTransferAsynchronously(transactionProtocol)

  //return newly created transfer with _id which will be used to ping db to get transfer results.
  res.send(transfersModel);

});

async function runTransferAsynchronously(transactionProtocol){
  let exitTransactionSuccessful = await transactionProtocol.exitTransaction();
  if(exitTransactionSuccessful){
    transactionProtocol.entryTransaction();
  }
}

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
