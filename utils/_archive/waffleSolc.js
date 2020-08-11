/**
 * example from https://www.npmjs.com/package/@ethereum-waffle/compiler
 * Not only does this not work but it spams the console until VS Code freezes. Yay!
 */


var fs = require('fs');
var path = require('path');
const {compileProject,compileAndSave} = require('@ethereum-waffle/compiler');
var waffleJsonPath = path.join(__dirname,'../waffle.json');
var waffleJson = require('./waffle.json');

main();
async function main () {
  await compileAndSave(waffleJson);
}