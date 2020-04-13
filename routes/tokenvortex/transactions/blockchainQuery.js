var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var ethers = require("ethers");
var TransfersModel = require("../models/mongodb/transfers");


class BlockchainQuery {
  body;
  res;
  mongoContract;
  ethersContract;
  constructor(body, mongoContract, res) {
    this.body = body;
    this.res = res;
    this.mongoContract = mongoContract;

    let provider = ethers.getDefaultProvider(body.network);
    let wallet = new ethers.Wallet(process.env.privateKey, provider);
    this.ethersContract = new ethers.Contract(
      mongoContract.addresses[body.network],
      JSON.parse(mongoContract.abi),
      wallet
    );
  }

  balanceOf(accountAddress) {
    this.ethersContract.balanceOf(accountAddress).then((balance) => {
      let finalResult = parseInt(balance._hex, 16);
      this.res.send(finalResult.toString());
    });
  }

  balanceOfAvailable(accountAddress) {
    this.ethersContract.balanceOfAvailable(accountAddress).then((balance) => {
      let finalResult = parseInt(balance._hex, 16);
      this.res.send(finalResult.toString());
    });
  }

  vortexTransferSyn(sender, recipient,amount,isValid) {
    const timestamp = date.getTime();
    this.ethersContract
    .vortexTransferSyn(timestamp, sender, recipient,amount,isValid)
    .then(result => {
        this.logTransfer(timestamp, sender, recipient,amount,isValid,result)
        this.res.send(result);
    });
  }

  vortexTransferAck(timestamp, sender, recipient,amount,isValid) {
    this.ethersContract
    .vortexTransferAck(timestamp, sender, recipient,amount,isValid)
    .then(result => {
        this.logTransfer(timestamp, sender, recipient,amount,isValid,result)
        this.res.send(result);
    });
  }


  vortexTransferSynAck(timestamp, sender, recipient,amount,isValid) {
    this.ethersContract
    .vortexTransferAck(timestamp, sender, recipient,amount,isValid)
    .then(result => {
        this.logTransfer(timestamp, sender, recipient,amount,isValid,result)       
        this.res.send(result);
    });
  }

  logTransfer(timestamp, sender, recipient,amount,isValid,result){
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
