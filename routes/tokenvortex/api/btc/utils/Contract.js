
const fs = require('fs-extra');
const statman = require('statman');
const pidusage = require('pidusage');
const si = require('systeminformation');
const ethers = require("ethers");
const TimeHelper = require('./TimeHelper');
const LogbookModel = require('./models/logbook');
class Contract {
	constructor(network, msgSender, contractSettings, artifact) {
		this.network = network;
		this.msgSender = msgSender;
		this.contractSettings = contractSettings;
		this.address = contractSettings.addresses[network];
		const infura = new ethers.providers.InfuraProvider(network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
		const ganache = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
		this.provider = network == "ganache" ? ganache : infura;
		this.wallet = new ethers.Wallet(msgSender.privateKey, this.provider);
		this.ethersContract = new ethers.Contract(this.address, artifact.abi, this.wallet);
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

	async _logTxParams(tx, stopwatch, logbook, ethersTx) {
		let gasEstimationHex = await this.provider.estimateGas(ethersTx);
		let gasEstimation = parseInt(gasEstimationHex);
		logbook.txs.push({
			method: tx.method,
			args: tx.args,
			gasEstimation,
			split: Math.floor(stopwatch.read(0) / 1000)
		});
	}

	_runWithoutArgs(tx, stopwatch, logbook) {
		let txSummary = {};
		return txSummary;
	}

	async run(method, args, stopwatch,isPayable) {		
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
