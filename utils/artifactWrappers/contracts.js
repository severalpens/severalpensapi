const contracts = {}
const BurnToClaim = require('../../build/BurnToClaim.json');
const BasicToken = require('../../build/BasicToken.json');

 contracts.burnToClaim = [
   {},{},{},{},{},{},
{
  name: "burnToClaim",
  symbol: "BTC",
  version: "0.0.6",
  addresses: {
  ropsten: "0x5f60bEE5F1422b0eFB2fdc6D7AB9f41a96946C46",
  kovan: "",
  rinkeby: "0x4800263139D1106dc1c75FC0b5eDDa10f7d627F9",
  ganache: "0xA391323f66cd7118421382177f627B39b4D7cdeC",
  },
  abi: BurnToClaim.abi,
  bytecode: BurnToClaim.bytecode,
},
{
  name: "burnToClaim",
  symbol: "BTC",
  version: "0.0.7",
  addresses: {
  ropsten: "0x5f60bEE5F1422b0eFB2fdc6D7AB9f41a96946C46",
  kovan: "",
  rinkeby: "0x229F61F2b54cB29dDFB535C220c61Bf56Ed0ad7A",
  ganache: "0xA391323f66cd7118421382177f627B39b4D7cdeC",
  },
  abi: BurnToClaim.abi,
  bytecode: BurnToClaim.bytecode,
},

];

contracts.basicToken = 
  {
  name: "Basic",
  symbol: "BSC",
  version: "0.0.0",
  addresses: {
    ropsten: "0xe33F7eea823ACEcb4CD6A289e93Aca762B28Ba21",
    kovan: "",
    rinkeby: "0x87414D070508d38b450C5e03C2237d6475F685F5",
    goerli: "",
    ganache7545: "",
    ganache8545: "",
  },
  abi: BasicToken.abi,
  bytecode: BasicToken.bytecode,
};


module.exports = contracts;
