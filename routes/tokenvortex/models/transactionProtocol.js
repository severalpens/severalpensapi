var ethers = require("ethers");
var ContractsModel = require("../models/mongodb/contracts");

class TransactionProtocol {
  constructor(_id) {
    this._id = _id;
    this.burnAddress = this.genAddress();   
  }
  
  genAddress() {
    let burnAccount = ethers.Wallet.createRandom();
    let burnAddress = burnAccount.signingKey.address;
    return burnAddress;
  }


  exitTransaction(network, sender,  amount) {
    try {
      ContractsModel.findOne({ _id: this._id }, async (err, contract) => {
        let exitContract = newEthersContract(network, contract);

        //submit the exit transaction to the network provider.
        let exitSubmitted = await exitContract.transferFrom(sender, this.burnAddress, amount);
        this.log({ exitSubmitted });

        //Use ethers.js 'wait' function to listen for a response from the network and log the result.
        let exitCompleted = await exitSubmitted.wait();
        this.log({ exitCompleted });
      });
    } catch {
      this.log({ exitCompleted: "failed" });
    }
  }

   entryTransaction(network, recipient,  amount) {
    try {
      ContractsModel.findOne({ _id: this._id }, async (err, contract) => {
        let entryContract = newEthersContract(network, contract);

        //submit the exit transaction to the network provider.
        let entrySubmitted = await entryContract.transfer(recipient, amount);
        this.log({ entrySubmitted });

        //Use ethers.js 'wait' function to listen for a response from the network and log the result.
        let entryCompleted = await entrySubmitted.wait();
        this.log({ entryCompleted });
      });
    } catch {
      this.log({ entryCompleted: "failed" });
    }
  }

  newEthersContract(network, contract) {
    let contractAddress = contract.addresses[network];
    let provider = ethers.getDefaultProvider(network);
    let wallet = new ethers.Wallet(process.env.privateKey, provider);
    let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);
    return ethersContract;
  }

  log(record){
    this.transfer.logs.push(record);
    this.transfer.save();
  }
}

module.exports = TransactionProtocol;
