var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var contractsSchema = new Schema({
    fungible: Boolean,
    symbol: String,
    name: String,
    version: String,
    owner: String,
    locked: Boolean,
    accounts: Array,
    addresses: {
      ropsten: String,
      kovan: String,
      rinkeby: String,
      goerli: String,
    },
    soliditycode: String,
    abi: String,
    isActive: Boolean
  });
  
  var ContractsModel = mongoose.model("contracts", contractsSchema, "contracts");
  
  module.exports = ContractsModel;