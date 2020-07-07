var ethers = require("ethers");
const ContractsModel = require("../models/mongodb/contracts");
const AccountsModel = require("../models/mongodb/accounts");

async function getBalance(network,publisherAccount,contractAddress, contract, publisherAddress   ){
  let provider = ethers.getDefaultProvider(network);
  let wallet = new ethers.Wallet(publisherAccount.privateKey, provider);
  let ethersContract = new ethers.Contract(contractAddress, JSON.parse(contract.abi), wallet);
  let balance = await ethersContract.balanceOf(publisherAddress);
  console.log(balance);
}

module.exports = getBalance;
