var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var ethers = require("ethers");
var TransfersModel = require("../models/mongodb/transfers");


class BlockchainQuery {
  body;
  mongoContract;
  ethersContract;
  constructor(body, mongoContract) {
    this.body = body;
    this.mongoContract = mongoContract;
    let provider = ethers.getDefaultProvider(body.network);
    let wallet = new ethers.Wallet(process.env.privateKey, provider);

    this.ethersContract = new ethers.Contract(
      mongoContract.addresses[body.network],
      JSON.parse(mongoContract.abi),
      wallet
    );
  }

  getBalances(accountAddress,res) {
    let balances = {
      current: 0,
      available: 0
    }
    this.ethersContract.balanceOf(accountAddress).then((cb) => {
      balances.current = parseInt(cb._hex, 16);
      this.ethersContract.balanceOfAvailable(accountAddress).then((ab) => {
        balances.available = parseInt(ab._hex, 16);  
        res.send(balances);
      });
    });
  }

  vortexTransferSyn(id, uuid, key, sender, recipient,amount,isValid,res) {
    const timestamp = date.getTime();
    this.ethersContract
    .vortexTransferSyn(id, uuid, key, sender, recipient,amount,isValid)
    .then(result => {
        this.logTransfer(id, uuid, key, sender, recipient,amount,isValid)
        res.send(result);
    });
  }

  externalTransferInit(id, uuid, key, sender, recipient,amount,isValid, res) {
    const timestamp = date.getTime();
    this.ethersContract
    .vortexTransferSyn(id, uuid, key, sender, recipient,amount,isValid)
    .then(result => {
        this.logTransfer(id, uuid, key, sender, recipient,amount,isValid)
        res.send(result);
    });
  }

  vortexTransferAck(id, uuid, key, sender, recipient,amount,isValid, res) {
    this.ethersContract
    .vortexTransferAck(id, uuid, key, sender, recipient,amount,isValid)
    .then(result => {
        this.logTransfer(id, uuid, key, sender, recipient,amount,isValid)
        res.send(result);
    });
  }


  vortexTransferSynAck(id, uuid, key, sender, recipient,amount,isValid,res) {
    this.ethersContract
    .vortexTransferAck(id, uuid, key, sender, recipient,amount,isValid)
    .then(result => {
        this.logTransfer(id, uuid, key, sender, recipient,amount,isValid)       
        res.send(result);
    });
  }

  logTransfer(id, uuid, key, sender, recipient,amount,isValid,res){
    let transfer = {};
    transfer.timestamp = timestamp;
    transfer.sender = sender;
    transfer.privateKey = recipient;
    transfer.publicKey = amount;
    transfer.mnemonic = isValid;
    transfer.locked = result;
  
    TransfersModel.create(transfer).then(result => {
      return result;
    });
  }

}

module.exports = BlockchainQuery;

/*
1: Why not the address? - Because ethers requires the abi code to create the appropriate contract object.
Therefore its a lot easier for the server to  retreive contract from the database and extract both the address
and abi code rather than require the client to post it all.
*/
