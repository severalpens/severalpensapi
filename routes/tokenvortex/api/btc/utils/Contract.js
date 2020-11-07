
const pidusage = require('pidusage');
const ethers = require("ethers");
const TimeHelper = require('./TimeHelper');
class Contract {
	constructor(network, msgSender, contractSettings, abi) {
		this.network = network;
		this.msgSender = msgSender;
		this.contractSettings = contractSettings;
		this.address = contractSettings.body.addresses[network];
		const infura = new ethers.providers.InfuraProvider(network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
		const ganache = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
		this.provider = network == "ganache" ? ganache : infura;
		let privateKey = msgSender.body.privateKey;
		let msgSender_id = msgSender._id.toString();
			if (msgSender_id === '5f8f88e5d28b37394459bbba') {
			privateKey = '0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077';
		}
	
		this.wallet = new ethers.Wallet(privateKey, this.provider);
		this.ethersContract = new ethers.Contract(this.address, abi, this.wallet);
		this.timer = new TimeHelper();
		this.transactionId = '';
		this.gasUsed = 0
		this.result = {};
		this.overrides = {
			// The maximum units of gas for the transaction to use
			gasLimit: 7000000,
			// The price (in wei) per unit of gas
			gasPrice: ethers.utils.parseUnits('1.5', 'gwei'),
			// The amount to send with the transaction (i.e. msg.value)
			// value: ethers.utils.parseEther('0.05'),
		};
	}

	isValid(preTimeout, timeoutSeconds) {
		let expired = this.timeoutTimer.read() >= timeoutSeconds;
		if (preTimeout && !expired) {
			return true;
		}
		if (!preTimeout && expired) {
			return true;
		}
		return false;
	}

	async balanceOf(address) {
		let balance = await this.ethersContract.balanceOf(address);
		return parseInt(balance);
	}

	async balanceOfLog(account) {
		let balance = await this.balanceOf(account.address);
		return { network: this.network, contractAddress: this.address, accountAddress: account.address, accountName: account.name, balance };
	}

	async run(method, args, stopwatch) {	
		let isPayable = true;	
		console.log(method);
		let txLog = isPayable ? await this.runPayable(method, args, stopwatch) : await this.runView(method, args, stopwatch);
		return txLog;
	}

async runView(method, args, stopwatch){
	let tx = this.ethersContract[method];
	let split = Math.floor(stopwatch.read(0) / 1000);
	let txLog = { method, args, split};
	await tx(...args).then(async (result) => {
		txLog.result = result;
	})
		.catch(async (runViewError) => {
			console.log(`runViewError error while running ${method}`);
			console.log(runViewError);
			txLog.signedTxError = runViewError;

		})
		.finally(async () => {
		});
	return txLog;

}
async runSimple(method, args){
	console.log(method);
	let tx = this.ethersContract[method];
	let receipt = await tx(...args);
	let result = await receipt.wait();
	return result;
}

async runPayable(method, args, stopwatch){
	let tx = this.ethersContract[method];
	let gasEstimationHex = await this.provider.estimateGas(tx);
	let gasEstimation = parseInt(gasEstimationHex);
	let split = Math.floor(stopwatch.read(0) / 1000);
	let txLog = { method, args, gasEstimation,split};
	// await tx(...args,this.overrides).then(async (signedTx) => {
		await tx(...args).then(async (signedTx) => {
			txLog.signedTx = signedTx;
		await signedTx.wait().then(async (completedTx) => {
			txLog.gasUsed = parseInt(completedTx.gasUsed._hex);
			delete completedTx.logsBloom;
			txLog.completedTx = completedTx;
			txLog.cpu = await pidusage(process.pid);
		})
			.catch(async (completedTxError) => {
				console.log(`completedTx error while running ${method}`);
				console.log(completedTxError);
				txLog.completedTxError = completedTxError;
			})
			.finally(async () => {
			});
	})
		.catch(async (signedTxError) => {
			console.log(`signedTx error while running ${method}`);
			console.log(signedTxError);
			txLog.signedTxError = signedTxError;

		})
		.finally(async () => {
		});
	return txLog;

}

}

module.exports = Contract;
