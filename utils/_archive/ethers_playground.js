/**
 * See https://docs.ethers.io/ethers.js/v5-beta/#
 * To run:
 * node utils/_archive/ethers_playground
 */

var line = require('./line');
var ethers = require('ethers');
let utils = ethers.utils;

let provider = ethers.getDefaultProvider('rinkeby');
let privateKey = "0x3141592653589793238462643383279502884197169399375105820974944592";
let address = "0x7357589f8e367c2C31F51242fB77B350A11830F3";
let icapAddress = "XE93OF8SR0OWI6F4FO88KWO4UNNGG1FEBHI";
let transaction = {from: '0xc6af6e1a78a6752c7f8cd63877eb789a2adb776c', nonce: 0};
let wallet = new ethers.Wallet(privateKey, provider);
// console.log('wallet',wallet);


let gasPriceWei = utils.bigNumberify("1");
let gasLimit = utils.bigNumberify(1);



// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#addresses

//convert between address formats
// let address = "0xd115bffabbdd893a6f7cea402e7338643ced44a6";

console.log(line(), utils.getAddress(address));
// "0xD115BFFAbbdd893A6f7ceA402e7338643Ced44a6"

console.log(line(),utils.getAddress(icapAddress));
// "0xD115BFFAbbdd893A6f7ceA402e7338643Ced44a6"

console.log(line(), utils.getAddress(address, true));
// "XE93OF8SR0OWI6F4FO88KWO4UNNGG1FEBHI"

console.log(line(), utils.getAddress(icapAddress, true));
// "XE93OF8SR0OWI6F4FO88KWO4UNNGG1FEBHI"


// Ropsten: 0x5bdfd14fcc917abc2f02a30721d152a6f147f09e8cbaad4e0d5405d646c5c3e1
console.log(line(), utils.getContractAddress(transaction));
// "0x0CcCC7507aEDf9FEaF8C8D731421746e16b4d39D"



//determine a contract address
// Ropsten: 0x5bdfd14fcc917abc2f02a30721d152a6f147f09e8cbaad4e0d5405d646c5c3e1

console.log(line(), utils.getContractAddress(transaction));
// "0x0CcCC7507aEDf9FEaF8C8D731421746e16b4d39D"



//https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#arrayish
// ########## Has errors. May be Typescript only. ###########
 let arrayish = utils.arrayify(address);
 console.log(line(), arrayish );
 // The following don't work
//  console.log("isArrayish", utils.isArrayish(arrayish) ); 
// console.log("utils.concat(arrayish,'1')", utils.concat(arrayish)); 
// console.log("padZeros", utils.padZeros(arrayish,4) );
// console.log("padZeros", utils.stripZeros(arrayish,4) );


// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#big-numbers
//big numbers combined with different native type conversions: https://www.w3schools.com/js/js_type_conversion.asp
// number.toString(radix)
// 2 - The number will show as a binary value
// 8 - The number will show as an octal value
// 16 - The number will show as an hexadecimal value

let a = 3;
let b = 2;
let aBigNumber = utils.bigNumberify(a);
let bBigNumber = utils.bigNumberify(b);
console.log(line(), Number(aBigNumber.add(b)));
console.log(line(), parseInt(aBigNumber.sub(b)));
console.log(line(), aBigNumber.mul(b).toString());
console.log(line(), aBigNumber.div(b).toString());
console.log(line(), aBigNumber.mod(b));
console.log(line(), aBigNumber.maskn(b));
console.log(line(), aBigNumber.eq(b));
console.log(line(), aBigNumber.lt(b));
console.log(line(), aBigNumber.lte(b));
console.log(line(), aBigNumber.gt(b));
console.log(line(), aBigNumber.gte(b));
console.log(line(), aBigNumber.isZero(b));
console.log(line(), aBigNumber.toNumber(b));
console.log(line(), aBigNumber.toString(b));
console.log(line(), aBigNumber.toHexString(b));

//https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#creating-instances
 gasPriceWei = utils.bigNumberify("20902747399");
 gasLimit = utils.bigNumberify(3000000);

let maxCostWei = gasPriceWei.mul(gasLimit)
console.log(line(), maxCostWei.toString());
// "Max Cost: 62708242197000000"

try{
  console.log(line(), maxCostWei.toNumber());
}
catch(err){
  console.log(line(), 'maxCostWei.toNumber() throws an Error, the value is too large for JavaScript to handle safely');
}


// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#bytes32-strings

let text = "Hello World!"
let bytes32 = ethers.utils.formatBytes32String(text)
// "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"

let originalText = ethers.utils.parseBytes32String(bytes32)
// "Hello World!"


// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#constants




// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#cryptographic-functions
// let signature = "0xddd0a7290af9526056b4e35a077b9a11b513aa0028ec6c9880948544508f3c63" +
//                   "265e99e47ad31bb2cab9646c504576b3abc6939a1710afc08cbf3034d73214b8" +
//                   "1c";

// let signingAddress = ethers.Wallet.verifyMessage('hello world', signature);

// console.log(signingAddress);
// "0x14791697260E4c9A71f18484C9f997B308e59325"


// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#hash-functions

console.log(line(), utils.keccak256([ 0x42 ]));
// '0x1f675bff07515f5df96737194ea945c36c41e7b4fcef307b7cd4d0e602a69111'

console.log(line(), utils.keccak256("0x42"));
// '0x1f675bff07515f5df96737194ea945c36c41e7b4fcef307b7cd4d0e602a69111'


console.log(line(), utils.sha256([ 0x42 ]));
// '0xdf7e70e5021544f4834bbee64a9e3789febc4be81470df629cad6ddb03320a5c'

console.log(line(), utils.sha256("0x42"));
// '0xdf7e70e5021544f4834bbee64a9e3789febc4be81470df629cad6ddb03320a5c'



// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#hash-function-helpers

// Convert the string to binary data
let message = "Hello World";
let messageBytes = utils.toUtf8Bytes(message);
utils.keccak256(messageBytes);
// '0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba'

// Which is equivalent to using the id function
utils.id("Hello World");
// '0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba'


// Compute the sighash for a Solidity method
console.log(utils.id("addr(bytes32)"));
// '0x3b3b57de213591bb50e06975ea011e4c8c4b3e6de4009450c1a9e55f66e4bfa4'


// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#random

let randomBytes3 = utils.randomBytes(3)
// Uint8Array [ 194, 22, 140 ]

let randomBytes32 = utils.randomBytes(32)
// Uint8Array [ 162, 131, 117, 110, 196, 73, 144, 177, 201, 75, 88,
//              105, 227, 210, 104, 226, 82, 65, 103, 157, 36, 170,
//              214, 92, 190, 141, 239, 54, 96, 39, 240, 95 ]


let randomNumber = utils.bigNumberify(utils.randomBytes(32));
// BigNumber { _hex: 0x617542634156966e0bbb6c673bf88015f542c96eb115186fd93881518f05f7ff }

// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#solidity


let result = utils.solidityKeccak256([ 'int8', 'bytes1', 'string' ], [ -1, '0x42', 'hello' ]);
console.log(result);
// '0x52d7e6a62ca667228365be2143375d0a2a92a3bd4325dd571609dfdc7026686e'

result = utils.soliditySha256([ 'int8', 'bytes1', 'string' ], [ -1, '0x42', 'hello' ]);
console.log(result);
// '0x1eaebba7999af2691d823bf0c817e635bbe7e89ec7ed32a11e00ca94e86cbf37'

result = utils.solidityPack([ 'int8', 'bytes1', 'string' ], [ -1, '0x42', 'hello' ]);
console.log(result);
// '0xff4268656c6c6f'






// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#ether-strings-and-wei
wei = utils.parseEther('1000.0');
console.log(wei.toString(10));
// "1000000000000000000000"

console.log(utils.formatEther(0));
// "0.0"

wei = utils.bigNumberify("1000000000000000000000");

console.log(utils.formatEther(wei));
// "1000.0"

console.log(utils.formatEther(wei, {commify: true}));
// "1,000.0"

console.log(utils.formatEther(wei, {pad: true}));
// "1000.000000000000000000"       (18 decimal places)

console.log(utils.formatEther(wei, {commify: true, pad: true}));
// "1,000.000000000000000000"      (18 decimal places)



// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#hex-strings

namehash = utils.namehash('ricmoo.firefly.eth');
// "0x0bcad17ecf260d6506c6b97768bdc2acfb6694445d27ffd3f9c1cfbee4a9bd6d"



// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#signatures

// Flat-format; this is the format provided by JSON-RPC responses
flat = "0x0ba9770fd8778383f6d56faadc71e17b75f0d6e3ff0a408d5e6c4cee3bd70a16" +
             "3574da0ebfb1eaac261698b057b342e52ea53f85287272cea471a4cda41e3466" +
             "1b"
expanded = utils.splitSignature(flat);

console.log(expanded);
// {
//    r: "0x0ba9770fd8778383f6d56faadc71e17b75f0d6e3ff0a408d5e6c4cee3bd70a16",
//    s: "0x3574da0ebfb1eaac261698b057b342e52ea53f85287272cea471a4cda41e3466",
//    recoveryParam: 0,
//    v: 27
// }

// Flat-format; this is the format provided by JSON-RPC responses
flat = "0x0ba9770fd8778383f6d56faadc71e17b75f0d6e3ff0a408d5e6c4cee3bd70a16" +
             "3574da0ebfb1eaac261698b057b342e52ea53f85287272cea471a4cda41e3466" +
             "1b"
expanded = utils.splitSignature(flat);

console.log(expanded);
// {
//    r: "0x0ba9770fd8778383f6d56faadc71e17b75f0d6e3ff0a408d5e6c4cee3bd70a16",
//    s: "0x3574da0ebfb1eaac261698b057b342e52ea53f85287272cea471a4cda41e3466",
//    recoveryParam: 0,
//    v: 27
// }


// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#transactions





// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#transactions

text = "Hello World";

bytes = utils.toUtf8Bytes(text);

console.log(bytes);
// Uint8Array [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]


array = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];

stringFromArray = utils.toUtf8String(array)

console.log(stringFromArray);
// "Hello World"

hexString = "0x48656c6c6f20576f726c64";
stringFromHexString = utils.toUtf8String(hexString);

console.log(stringFromHexString);
// "Hello World"






// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#namehash




// https://docs.ethers.io/ethers.js/v5-beta/api-utils.html#addresses


console.log(line(), utils.getAddress(address));
// "0xD115BFFAbbdd893A6f7ceA402e7338643Ced44a6"

console.log(line(), utils.getAddress(icapAddress));
// "0xD115BFFAbbdd893A6f7ceA402e7338643Ced44a6"

console.log(line(), utils.getAddress(address, true));
// "XE93OF8SR0OWI6F4FO88KWO4UNNGG1FEBHI"

console.log(line(), utils.getAddress(icapAddress, true));
// "XE93OF8SR0OWI6F4FO88KWO4UNNGG1FEBHI"








console.log(line(), gasPriceWei);

console.log(line(), gasLimit);
