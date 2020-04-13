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
      rinkeby: String,
      ropsten: String
    },
    soliditycode: String,
    abi: String,
    bytecode: String,
    isActive: Boolean
  });
  
  var ContractsModel = mongoose.model("contracts", contractsSchema, "contracts");
  
  module.exports = ContractsModel;