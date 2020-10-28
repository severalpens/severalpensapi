const ethers = require("ethers");
const abi = require('./abi.json');

async function asdf(){
  let provider = new ethers.providers.InfuraProvider('rinkeby', 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let wallet = new ethers.Wallet('0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077', provider);
  let ethersContract = new ethers.Contract('0xfD6f44b58e93f2ef192c5Fe4dad265B8aF86e38C',abi, wallet);
  let tx = await ethersContract.transfer('0xd627a8B6dbEA4C24a2a4D34E367C27E8019533BA',1);
  let result = await tx.wait();
  console.log(result);
  // let msgSenderTokenBalance = await ethersContract.balanceOf(transfer.msgSender.body.address);
  // console.log(parseInt(msgSenderTokenBalance._hex));
  // let msgSenderEthBalance = await provider.getBalance(transfer.msgSender.body.address);
  // console.log(parseInt(msgSenderEthBalance._hex));
}
asdf();
  // let tx = await ethersContract.transfer('0x601333429BB2d38561e0d21ca5751B7f6e8aa170',100);
  // let result = await tx.wait();
  // res.send(result);
  // let methodArgs = ['0x601333429BB2d38561e0d21ca5751B7f6e8aa170',100];

  // method(...methodArgs,{ gasLimit: 7000000, gasPrice: ethers.utils.parseUnits('1.5', 'gwei'),})
  //   .then(async (tx) => {

  //       tx.wait()
  //         .then(async (tx2) => {
  //           res.send(tx2);
  //         })
  //         .catch(async (error) => {
  //           res.send(error);
  //         })
  //   })
  //   .catch(async (error) => {
  //     res.send(error);
  //   })



