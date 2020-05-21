var ethers = require("ethers");


class TransactionProtocol {
    constructor(exitContract, entryContract,props){
        this.exitContract = exitContract;
        this.entryContract = entryContract;
        this.props = props;
        this.props.amount =  parseInt(this.props.amount) || 1;
        this.genAddress();
    }
    
  genAddress() {
      this.burnAccount = ethers.Wallet.createRandom();
      this.burnAddress = this.burnAccount.signingKey.address;
      return this.burnAddress;
  }

  run(res){
    this.exitContract.transferFrom(this.props.senderAddress, this.burnAddress,this.props.amount).then(exitStart => {
        exitStart.wait().then(exitFinish => {
            this.entryContract.transfer(this.props.recipientAddress, this.props.amount).then(entryStart => {
                entryStart.wait().then(entryFinish => {
                    res.send({exitFinish, entryFinish})
            })
        })
    })
});

}

}

module.exports = TransactionProtocol;
