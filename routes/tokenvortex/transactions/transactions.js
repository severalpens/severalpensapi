var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var ethers = require("ethers");
var ContractsModel = require('../models/mongodb/contracts');
var BlockchainQuery = require('./blockchainQuery');

var cors = require('cors');
router.use(cors());



router.post("/balanceof", bodyParser.json(), function(req, res, next) {
    let _id = req.body.contract_id; //See note: 1
    ContractsModel.findOne({_id},(err,mongoContract) => {
      let  blockchainQuery = new BlockchainQuery(req.body,mongoContract,res);
       blockchainQuery.balanceOf(req.body.accountAddress);     
    })
  });


  router.post("/balanceofavailable", bodyParser.json(), function(req, res, next) {
    let _id = req.body.contract._id; //See note: 1
    ContractsModel.findOne({_id},(err,mongoContract) => {
      let  blockchainQuery = new BlockchainQuery(req.body,mongoContract,res);
       blockchainQuery.balanceOfAvailable(req.body.account.address);     
    })
  });

  
  
  router.post("/transfer", bodyParser.json(), function(req, res, next) {
    let _id = req.body.contract._id; //See note: 1
    ContractsModel.findOne({_id},(err,mongoContract) => {
            let  blockchainQuery = new BlockchainQuery(req.body,mongoContract,res);
            blockchainQuery.vortexTransferSyn(
              req.body.timestamp,
              req.body.sender,
              req.body.recipient,
              req.body.amount,
              req.body.isValid
          );     
          
          blockchainQuery.vortexTransferAck(
            req.body.timestamp,
            req.body.sender,
            req.body.recipient,
            req.body.amount,
            req.body.isValid);

            blockchainQuery.vortexTransferSynAck(
              req.body.timestamp,
              req.body.recipient,
              req.body.amount,
              req.body.isValid
          );     
})
  });  

    router.post("/vortextransfersyn", bodyParser.json(), function(req, res, next) {
        let _id = req.body.contract._id; //See note: 1
        ContractsModel.findOne({_id},(err,mongoContract) => {
                let  blockchainQuery = new BlockchainQuery(req.body,mongoContract,res);
                blockchainQuery.vortexTransferSyn(
                    req.body.sender,
                    req.body.recipient,
                    req.body.amount,
                    req.body.isValid
                );     
        })
      });

  router.post("/vortexTransferAck", bodyParser.json(), function(req, res, next) {
    let _id = req.body.contract._id; //See note: 1
    ContractsModel.findOne({_id},(err,mongoContract) => {
            let  blockchainQuery = new BlockchainQuery(req.body,mongoContract,res);
            blockchainQuery.vortexTransferAck(
                req.body.timestamp,
                req.body.sender,
                req.body.recipient,
                req.body.amount,
                req.body.isValid
            );     
    })
  });

  router.post("/vortexTransferSynAck", bodyParser.json(), function(req, res, next) {
    let _id = req.body.contract._id; //See note: 1
    ContractsModel.findOne({_id},(err,mongoContract) => {
            let  blockchainQuery = new BlockchainQuery(req.body,mongoContract,res);
            blockchainQuery.vortexTransferSynAck(
                req.body.timestamp,
                req.body.recipient,
                req.body.amount,
                req.body.isValid
            );     
    })
  });

module.exports = router;

/*
1: Why not the address? - Because ethers requires the abi code to create the appropriate contract object.
Therefore its a lot easier for the server to  retreive contract from the database and extract both the address
and abi code rather than require the client to post it all.
*/



