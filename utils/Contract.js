
/**
 * Controller class that instantiates a contract via ethers.js
 */

var ethers = require("ethers");
var logger = require('./logger');
var compiler = require('./compiler');

class Contract {
	constructor(network, msgSender, metadata, isNew = false) {
		
		//construct wallet
		this.network = network;
		this.msgSender = msgSender;
		this.metadata = metadata;
		this.address = metadata.addresses[network];
		this.provider = ethers.getDefaultProvider(network);
		this.wallet = new ethers.Wallet(msgSender.privateKey, this.provider);
		
		//ethers instantiation
		!isNew ? this.createEthersContract() : null;
		
	}

	compile() {
		compiler.compile();
	}

	async deploy() {
		var factory = new ethers.ContractFactory(this.metadata.abi, this.metadata.bytecode, this.wallet);
		var deployment = await factory.deploy();
		var result = await deployment.deployed();
		return result;
	}

	createEthersContract() {
		this.ethersContract = new ethers.Contract(this.metadata.addresses[this.network], this.metadata.abi, this.wallet);
	}

	async run(method, args) {
		await this.ethersContract[method](...args)
			.then(async (txSignedLog) => {
				logger.info(txSignedLog);
				await txSignedLog.wait()
					.then((txCompletedLog) => {
						logger.info(txCompletedLog);
					})
					.catch((txCompletedError) => {
						logger.info(txCompletedError);
					});
			})
			.catch((txSigningError) => {
				logger.info(txSigningError);
			});
	}

	async run2(method,args){
		let tx = await this.ethersContract[method](...args);
		let result = await tx.wait();
		logger.info(result);
		return result;
	}


}

module.exports = Contract;
