/**
 * See https://www.npmjs.com/package/solc for details
 * It works for exremely simplified contracts but is very unstable.
 */

var solc = require('solc');
var fs = require('fs');
var path = require('path');

 var btcPath = path.join(__dirname,'../../src/BurnToClaim.sol');

 var btc = fs.readFileSync(btcPath,{encoding:'utf8'});

 var input = {
  language: 'Solidity',
  sources: {
    'btc': {
      content: btc
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};
 
function findImports(path) {
  if (path === 'lib.sol')
    return {
      contents: lib
    };
  else return { error: 'File not found' };
}
 
var output = JSON.parse(
  solc.compile(JSON.stringify(input), { import: findImports })
);
 
for (var contractName in output.contracts.test) {
  console.log(contractName + ': ' + JSON.stringify(output.contracts.test[contractName].abi));
}