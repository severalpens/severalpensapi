var ethers = require("ethers");
const ContractsModel = require("../models/mongodb/contracts");
const AccountsModel = require("../models/mongodb/accounts");

async function getBalance(network,publisherAccount,contractAddress, contract, publisherAddress   ){
  let balance = await ethersContract.balanceOf(publisherAddress);
  console.log(balance);
}

module.exports = getBalance;
