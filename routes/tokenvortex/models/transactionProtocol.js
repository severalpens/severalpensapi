var ethers = require("ethers");
var ContractsModel = require("../models/mongodb/contracts");
var TransfersModel = require("../models/mongodb/transfers");
const Stopwatch = require('statman-stopwatch');

class TransactionProtocol {
   constructor(transfer) {
    this.transfer = transfer;
    this.transfer.burnAddress = this.genAddress();  
    this.sw = new Stopwatch(true); 
  }
  
  genAddress() {
    let burnAccount = ethers.Wallet.createRandom();
    let burnAddress = burnAccount.signingKey.address;
    return burnAddress;
  }


  async exitTransaction() {
    let {senderNetwork: network,  senderAddress: sender,  amount} = this.transfer
    // try {
        let contract = await ContractsModel.findOne({ _id: this.transfer.contract_id }).exec();
        let exitContract = this.newEthersContract(network, contract);

        //submit the exit transaction to the network provider.
        this.transfer.logbook[0].startTime = this.sw.read(); 
         
        let exitSubmitted = await exitContract.transferFrom(sender, this.transfer.burnAddress, amount);
        this.transfer.logbook[0].endTime = this.sw.read();
        this.transfer.logbook[0].hash = exitSubmitted.hash;
        TransfersModel.updateOne({_id: this.transfer._id},{logbook: this.transfer.logbook}).exec();

        //Use ethers.js 'wait' function to listen for a response from the network and log the result.
        this.transfer.logbook[1].startTime = this.sw.read();  
        let exitCompleted = await exitSubmitted.wait();
        this.transfer.logbook[1].endTime = this.sw.read();
        this.transfer.logbook[1].hash = exitCompleted.transactionHash;
        TransfersModel.updateOne({_id: this.transfer._id},{logbook: this.transfer.logbook}).exec();

        return true;


    // } catch {
    //   TransfersModel.updateOne({_id: this.transfer._id},{status: 'failed'}).exec();     
    //   return false;
    // }
  }

   async entryTransaction() {
    let {recipientNetwork: network,  recipientAddress: recipient,  amount} = this.transfer
    try {
      let contract = await ContractsModel.findOne({ _id: this.transfer.contract_id }).exec();
      let entryContract = this.newEthersContract(network, contract);

        //submit the entry transaction to the network provider.
        this.transfer.logbook[2].startTime = this.sw.read();  
        let entrySubmitted = await entryContract.transfer(recipient, amount);
        this.transfer.logbook[2].endTime = this.sw.read();
        this.transfer.logbook[2].hash = entrySubmitted.hash;
        TransfersModel.updateOne({_id: this.transfer._id},{logbook: this.transfer.logbook}).exec();


        //Use ethers.js 'wait' function to listen for a response from the network and log the result.
        this.transfer.logbook[3].startTime = this.sw.read();  
        let entryCompleted = await entrySubmitted.wait();
        this.transfer.logbook[3].endTime = this.sw.read();
        this.transfer.logbook[3].hash = entryCompleted.transactionHash;
        TransfersModel.updateOne({_id: this.transfer._id},{logbook: this.transfer.logbook, status: 'completed'}).exec();

    } catch {
      TransfersModel.updateOne({_id: this.transfer._id},{status: 'failed'}).exec();     
      return false;
    }
  }

  newEthersContract(network, contract) {
    let contractAddress = contract.addresses[network];
    let contractPublishers = contract.publishers[network];
    let provider = ethers.getDefaultProvider(network);
    let wallet = new ethers.Wallet(process.env.privateKey, provider);
    let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);
    return ethersContract;
  }

}

module.exports = TransactionProtocol;
