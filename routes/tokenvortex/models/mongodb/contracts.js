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
    description: String,
    user_id: String,
    isLocked: Boolean,
    addresses: {
      ropsten: String,
      kovan: String,
      rinkeby: String,
      goerli: String,
        },    
    soliditycode: String,
    abi: String,
    abiJson: Array,
    isActive: Boolean
  });
  
  var ContractsModel = mongoose.model("contracts", contractsSchema, "contracts");
  
  module.exports = ContractsModel;