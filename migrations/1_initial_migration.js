const Migrations = artifacts.require("Migrations");
const TokenVorex = artifacts.require("TokenVortex");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TokenVorex);
};
