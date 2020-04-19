var ethers = require("ethers");


class BlockchainQuery {
  constructor(props, abi) {
    this.props = props;
    let provider = ethers.getDefaultProvider(props.network);
    let wallet = new ethers.Wallet(process.env.privateKey, provider);
    this.ethersContract = new ethers.Contract(
      props.contractAddress,
      JSON.parse(abi),
      wallet
    );
  }

  run(stage, res){
   let intStage = parseInt(stage);
    let {id,uuid,key,senderAddress,recipientAddress,amount,isValid} = this.props;
    id= 1;
    uuid=uuid|| "uuid";
    key=key|| "key";
    amount=amount|| 1;
    isValid=isValid|| "isValid";
    console.log("id:" + id.toString());
    console.log("uuid:" + uuid.toString());
    console.log("key:" + key.toString());
    console.log("amount:" + amount.toString());
    console.log("isValid:" + isValid.toString());
    switch (intStage) {
      case 0,1:
        this.ethersContract.externalTransferInit(id,uuid,key,senderAddress,recipientAddress,amount,isValid)
        .then(result => {
            res.send(result);
        });
       break;
       case 2:
        this.ethersContract.externalTransferSyn(id,uuid,key,senderAddress,recipientAddress,amount,isValid)
        .then(result => {
            res.send(result);
        });
       break;
       case 3:
        this.ethersContract.externalTransferSynack(id,uuid,key,senderAddress,recipientAddress,amount,isValid)
        .then(result => {
            res.send(result);
        });
       break;
       case 4:
        this.ethersContract.externalTransferAck(id,uuid,key,senderAddress,recipientAddress,amount,isValid)
        .then(result => {
            res.send(result);
        });
       break;
    
      default:
        res.send('transaction failed')
        break;
    }
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

  
}

module.exports = BlockchainQuery;

/*
1: Why not the address? - Because ethers requires the abi code to create the appropriate contract object.
Therefore its a lot easier for the server to  retreive contract from the database and extract both the address
and abi code rather than require the client to post it all.
*/
