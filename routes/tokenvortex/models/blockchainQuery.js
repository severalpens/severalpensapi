var ethers = require("ethers");


class BlockchainQuery {
  constructor(props, abi) {
    let provider = ethers.getDefaultProvider(props.network);
    let wallet = new ethers.Wallet(process.env.privateKey, provider);
    this.ethersContract = new ethers.Contract(
      props.contractAddress,
      JSON.parse(abi),
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

  
    externalTransferInit(res) {
      let {id,uuid,key,sender,recipient,amount,isValid} = this.props;
      this.ethersContract.externalTransferInit(id,uuid,key,sender,recipient,amount,isValid)
      .then(result => {
          res.send(result);
      });
    }

  externalTransferSyn(res) {
    let {id,uuid,key,sender,recipient,amount,isValid} = this.props;
    this.ethersContract.externalTransferSyn(id, uuid, key, sender, recipient,amount,isValid)
    .then(result => {
        res.send(result);
    });
  }
  
    externalTransferSynAck(res) {
      this.ethersContract
      .externalTransferAck(id, uuid, key, sender, recipient,amount,isValid)
      .then(result => {
          res.send(result);
      });
    }

  externalTransferAck(res) {
    this.ethersContract
    .externalTransferAck(id, uuid, key, sender, recipient,amount,isValid)
    .then(result => {
        res.send(result);
    });
  }


}

module.exports = BlockchainQuery;

/*
1: Why not the address? - Because ethers requires the abi code to create the appropriate contract object.
Therefore its a lot easier for the server to  retreive contract from the database and extract both the address
and abi code rather than require the client to post it all.
*/
