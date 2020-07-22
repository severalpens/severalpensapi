var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var addressesSchema = new Schema({
  ropsten: String,
  kovan: String,
  rinkeby: String,
  goerli: String,
  ganache7545: String,
  ganache8545: String,
});

var contractsSchema = new Schema({
    fungible: Boolean,
    symbol: String,
    name: String,
    version: String,
    user_id: String,
    isLocked: Boolean,
    addresses: {
      ropsten: String,
      kovan: String,
      rinkeby: String,
      goerli: String,
      ganache7545: String,
      ganache8545: String,
        },    
    publishers: {
      ropsten: String,
      kovan: String,
      rinkeby: String,
      goerli: String,
      ganache7545: String,
      ganache8545: String,
        },
    soliditycode: String,
    abi: String,
    isActive: Boolean
  });
  
  var ContractsModel = mongoose.model("contracts", contractsSchema, "contracts");
  
  module.exports = ContractsModel;