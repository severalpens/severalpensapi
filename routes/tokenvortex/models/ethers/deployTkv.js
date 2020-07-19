var ethers = require("ethers");


class DeployTkv {
  async deploy(network,contractAddress, abi,bytecode){
    this.network = network;
    this.contractAddress = contractAddress;
    let provider = network === 'ganache7545' ?  ethers.getDefaultProvider('http://127.0.0.1:7545') : ethers.getDefaultProvider(network);
    provider = network === 'ganache8545' ?  ethers.getDefaultProvider('http://127.0.0.1:8545') : ethers.getDefaultProvider(network);
    let wallet = new ethers.Wallet(process.env.privateKey, provider);

    // Create an instance of a Contract Factory
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Notice we pass in "Hello World" as the parameter to the constructor
    let contract = await factory.deploy();

    // The address the Contract WILL have once mined
    // See: https://ropsten.etherscan.io/address/0x2bd9aaa2953f988153c8629926d22a6a5f69b14e
    console.log(contract.address);
    // "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E"

    // The transaction that was sent to the network to deploy the Contract
    // See: https://ropsten.etherscan.io/tx/0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51
    console.log(contract.deployTransaction.hash);
    // "0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51"

    // The contract is NOT deployed yet; we must wait until it is mined
    await contract.deployed()

    // Done! The contract is deployed.

  }

  
}

module.exports = BlockchainQuery;
