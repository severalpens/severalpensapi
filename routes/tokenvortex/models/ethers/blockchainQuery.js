var ethers = require("ethers");
var LogsModel = require("../mongodb/logs");

function genAddress() {
  let burnAccount = ethers.Wallet.createRandom();
  let ba = burnAccount;
  console.log(ba);
  console.log(ba.address);
  let burnAddress = ba.address;
  return burnAddress;
}


class BlockchainQuery {
  constructor(tx, abi) {
    this.tx = tx;
    let provider = ethers.getDefaultProvider(tx.network);
    switch (tx.network) {
      case 'ganache7545':
        provider =  ethers.getDefaultProvider('http://127.0.0.1:7545');
        break;
      case 'ganache8545':
        provider =  ethers.getDefaultProvider('http://127.0.0.1:8545');
        break;
    }

    let wallet = new ethers.Wallet(tx.msgSenderPrivateKey, provider);
    this.ethersContract = new ethers.Contract(
      tx.contractAddress,
      abi,
      wallet
    );
  }

 async run(res){

    switch (this.tx.stage) {
      case 0:
        let burnAddress = genAddress();
        let hashlock =this.tx.hashlock|| "hashlock";
        let timelock = parseInt(this.tx.timelock) || new Date().getTime();
        let tokenAddress =this.tx.tokenAddress || "0x4B7C980fDb1bb81a36967fE9CB245531f4751804";
        let amount = parseInt(this.tx.amount) || 1;
        console.log(this.ethersContract);
        let ethersTx = await this.ethersContract.exitTransaction(burnAddress,hashlock,timelock,tokenAddress,amount);
        res.json({tx: ethersTx, burnAddress});
        let log = new LogsModel();
        log.transaction_id = this.tx._id;
        log.log = await ethersTx.wait();
        log.save();
       break;
       case 1: 

       contractId =this.tx.contractId|| "contractId";
       let recipient =this.tx.recipientAddress|| "0x4B7C980fDb1bb81a36967fE9CB245531f4751804";
       let preimage =this.tx.preimage|| "preimage";


        this.ethersContract.entryTransaction(contractId, recipient, preimage)
        .then(tx => res.send(tx));
     break;
       case 2:
       contractId =this.tx.contractId|| "contractId";
        this.ethersContract.reclaimTransaction(contractId)
        .then(tx => res.send(tx));
     break;
      default:
        res.send('transaction failed')
        break;
    }
  }


  // transactionProtocol(props,res){
  //   let senderAddress=props.senderAddress|| "0x4B7C980fDb1bb81a36967fE9CB245531f4751804";
  //   let recipientAddress=props.recipientAddress|| "0x4B7C980fDb1bb81a36967fE9CB245531f4751804";
  //   let amount = parseInt(props.amount) || 1;
  //   let burnAccount = ethers.Wallet.createRandom();
  //   this.ethersContract.transfer(senderAddress,burnAccount.signingKey.address,amount,isValid)
  //   .then(burnTx => {
  //       burnTx.wait().then(burnTxComplete => {

  //       })
  //   });



  // }

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
