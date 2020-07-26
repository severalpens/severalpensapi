var ethers = require("ethers");
var LogsModel = require("../mongodb/logs");

function genAddress() {
  let burnAccount = ethers.Wallet.createRandom();
  let ba = burnAccount;
  let burnAddress = ba.address;
  return burnAddress;
}

class BlockchainQuery {
  constructor(contract, transfer, txb, network) {
    this.contract = contract;
    //this.contract.abi = JSON.parse(contract.abi);
    this.transfer = transfer;
    this.txb = txb;
    this.network = network;

    let provider = ethers.getDefaultProvider(network);

    let wallet = new ethers.Wallet(transfer.msgSenderPrivateKey, provider);
    this.ethersContract = new ethers.Contract(
      this.contract.addresses[network],
      JSON.parse(this.contract.abi),
      wallet
    );
  }

  async run(res) {
    let abi = JSON.parse(this.contract.abi);
    let methodArgs = [];
    let functionAbi = abi.find((x) => x.name == this.txb.methodName);
    functionAbi.inputs.forEach((input) => {
      switch (input.name) {
        case "_burnAddress":
          let _burnAddress = genAddress()
          methodArgs.push(_burnAddress);
          break;
        case "_timelock":
          methodArgs.push(parseInt(this.transfer.timelock) || new Date().getTime() + 1500);
          break;
          case "_amount":
            methodArgs.push(parseInt(this.transfer.amount) || 1);
            break;
            case "_tokenContract":
              methodArgs.push(this.transfer.senderTokenAddress);
              break;
              default:
          methodArgs.push(this.transfer[input.name.slice(1)]);
          break;
      }
    });
    console.log(methodArgs);

    let method = this.ethersContract[this.txb.methodName];
    method(...methodArgs)
      .then((tx) => {
        res.json({ tx, burnAddress:'' });
        let log = new LogsModel();
        log.user_id = this.transfer.user_id;
        log.network = this.transfer.network;
        log.timestamp = new Date().getTime();
        log.transaction_id = this.transfer._id;
        log.log = tx;
        log.save();
        tx.wait()
          .then((tx2) => {
            let log = new LogsModel();
            log.user_id = this.transfer.user_id;
            log.network = this.network;
            log.timestamp = new Date().getTime();
            log.transaction_id = this.transfer._id;
            log.log = tx2;
            log.save();
          })
          .catch((error) => {
            let log = new LogsModel();
            log.user_id = this.transfer.user_id;
            log.network = this.network;
            log.timestamp = new Date().getTime();
            log.transaction_id = this.transfer._id;
            log.log = error;
            log.save();
          });
      })
      .catch((error) => {
        res.json({ tx: error, burnAddress:'' });
        let log = new LogsModel();
        log.user_id = this.transfer.user_id;
        log.network = this.network;
        log.timestamp = new Date().getTime();
        log.transaction_id = this.transfer._id;
        log.log = error;
        log.save();
      });
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
