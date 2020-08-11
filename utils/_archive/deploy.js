/**
 * See ethers documentation re contract deployment
 */


const ethers = require('ethers');
const accounts = require('../utils/accounts.js')
const contracts = require('../utils/contracts.js')
// The Contract interface
let abi = contracts.burnToClaim.abi;

// The bytecode from Solidity, compiling the above source
let bytecode = contracts.burnToClaim.bytecode;

// Connect to the network
let provider = ethers.getDefaultProvider('ropsten');

// Load the wallet to deploy the contract with
let privateKey = accounts.alice.privateKey;
let wallet = new ethers.Wallet(privateKey, provider);

// Deployment is asynchronous, so we use an async IIFE
(async function() {

    // Create an instance of a Contract Factory
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Notice we pass in "Hello World" as the parameter to the constructor
    let contract = await factory.deploy();

    // The address the Contract WILL have once mined
    // See: https://ropsten.etherscan.io/address/0x2bd9aaa2953f988153c8629926d22a6a5f69b14e
    console.log(contract.address);
    // "0x6980cD03ffB59ea90ADF7Bc1E1056cF01032b658"

    // The transaction that was sent to the network to deploy the Contract
    // See: https://ropsten.etherscan.io/tx/0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51
    console.log(contract.deployTransaction.hash);
    // "0x08b81a882aa2af11cefed58e616d820b9c0510933e458d92a805dfe0e0038918"

    // The contract is NOT deployed yet; we must wait until it is mined
    await contract.deployed()

    // Done! The contract is deployed.
})();