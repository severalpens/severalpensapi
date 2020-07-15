var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var addressesSchema = new Schema({
  ropsten: String,
  kovan: String,
  rinkeby: String,
  goerli: String,
  ganache: String,
});

var contractsSchema = new Schema({
    fungible: Boolean,
    symbol: String,
    name: String,
    version: String,
    owner: String,
    locked: Boolean,
    accounts: Array,
    addresses: {
      rinkeby: String,
      ropsten: String,
      kovan: String,
      goerli: String,
      ganache: String,
    },    
    publishers: {
      rinkeby: String,
      ropsten: String,
      kovan: String,
      goerli: String,
      ganache: String,
    },
    soliditycode: String,
    abi: String,
    isActive: Boolean
  });
  
  var ContractsModel = mongoose.model("contracts", contractsSchema, "contracts");
  
  module.exports = ContractsModel;