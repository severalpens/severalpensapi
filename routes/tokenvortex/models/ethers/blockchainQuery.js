var ethers = require("ethers");
var LogsModel = require("../mongodb/logs");

function genAddress() {
  let burnAccount = ethers.Wallet.createRandom();
  let ba = burnAccount;
  let burnAddress = ba.address;
  return burnAddress;
}

class BlockchainQuery {
  constructor(tx, abi, res) {
    this.tx = tx;
    let provider = ethers.getDefaultProvider(tx.network);
    switch (tx.network) {
      case "ganache7545":
        provider = ethers.getDefaultProvider("http://127.0.0.1:7545");
        break;
      case "ganache8545":
        provider = ethers.getDefaultProvider("http://127.0.0.1:8545");
        break;
    }

    let wallet = new ethers.Wallet(tx.msgSenderPrivateKey, provider);
    this.ethersContract = new ethers.Contract(tx.contractAddress, abi, wallet);
  }

  async run(res) {
    switch (this.tx.stage) {
      case 0:
        let burnAddress = genAddress();
        let hashlock = this.tx.hashlock || "hashlock";
        let timelock = parseInt(this.tx.timelock) || new Date().getTime();
        let tokenAddress =
          this.tx.tokenAddress || "0x4B7C980fDb1bb81a36967fE9CB245531f4751804";
        let amount = parseInt(this.tx.amount) || 1;
        this.ethersContract['exitTransaction'](burnAddress, hashlock, timelock, tokenAddress, amount)
          .then((tx) => {
            res.json({ tx, burnAddress });
            let log = new LogsModel();
            log.user_id = this.tx.user_id;
            log.network = this.tx.network;
            log.timestamp = new Date().getTime();
            log.transaction_id = this.tx._id;
            log.log = tx;
            log.save();
            tx.wait()
              .then((tx2) => {
                let log = new LogsModel();
                log.user_id = this.tx.user_id;
                log.network = this.tx.network;
                log.timestamp = new Date().getTime();
                log.transaction_id = this.tx._id;
                log.log = tx2;
                log.save();
              })
              .catch((error) => {
                let log = new LogsModel();
                log.user_id = this.tx.user_id;
                log.network = this.tx.network;
                log.timestamp = new Date().getTime();
                log.transaction_id = this.tx._id;
                log.log = error;
                log.save();
              });
          })  
          .catch((error) => {
            res.json({ tx: error, burnAddress });
            let log = new LogsModel();
            log.user_id = this.tx.user_id;
            log.network = this.tx.network;
            log.timestamp = new Date().getTime();
            log.transaction_id = this.tx._id;
            log.log = error;
            log.save();
          });

        break;
      case 1:
        returnVal = this.tx.returnVal || "returnVal";
        let recipient =
          this.tx.recipientAddress ||
          "0x4B7C980fDb1bb81a36967fE9CB245531f4751804";
        let preimage = this.tx.preimage || "preimage";

        this.ethersContract
          .entryTransaction(returnVal, recipient, preimage)
          .then((tx) => res.send(tx));
        break;
      case 2:
        returnVal = this.tx.returnVal || "returnVal";
        this.ethersContract
          .reclaimTransaction(returnVal)
          .then((tx) => res.send(tx));
        break;
      default:
        res.send("transaction failed");
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

  getBalances(accountAddress, res) {
    let balances = {
      current: 0,
      available: 0,
    };
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
