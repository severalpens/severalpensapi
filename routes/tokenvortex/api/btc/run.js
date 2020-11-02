const fs = require('fs-extra');
const statman = require('statman');
const stopwatch = new statman.Stopwatch();
const ethers = require('ethers');
const ethersWrapper = require('./utils/ethersWrapper');
const Contract = require('./utils/Contract');
const Sequence = require('./utils/Sequence');
const crypto = require('./utils/cryptoWrapper');
const tokenArtifact = require('./build/contracts/BasicToken.json');
const agentArtifact = require('./build/contracts/BurnToClaim.json');
const settings = require('./utils/settings.json');
const LogbookModel = require('./utils/models/logbook');
const TimeHelper = require('./utils/TimeHelper');
const dayjs = require('dayjs');

const overrides = {
  // The maximum units of gas for the transaction to use
  gasLimit: 1000000,
  // The price (in wei) per unit of gas
  gasPrice: ethers.utils.parseUnits('1.5', 'gwei'),
  // The amount to send with the transaction (i.e. msg.value)
  // value: ethers.utils.parseEther('0.05'),
};

async function run() {

  //-------------- DEPLOY--------------------------------------//
  //----Set deploy flag in utils/settings.json. Don't forget 'npm run compile' before deploying
  let init = await deploy();
  //-----------------------------------------------------------------//

  for (const i of iterations()) {
    const instances = createInstances();
    const logbook = createLogbook(i,instances);
    const sequence = new Sequence(settings, instances, logbook, i);

    if (init) {
      await sequence.runInitMethods();
      init = false;
    }


    console.log(`sequence iteration ${i}:`);
    // await instances.senderAgent.timer.init(settings.timeoutSeconds);
    stopwatch.start();
    await sequence.runTxs(stopwatch);

    logbook.postBalances.push(await getEthersBalance(settings.senderNetwork, settings.sender));
    logbook.postBalances.push(await getEthersBalance(settings.recipientNetwork, settings.sender));
    logbook.postBalances.push(await instances.senderToken.balanceOfLog(settings.sender));
    logbook.postBalances.push(await instances.senderToken.balanceOfLog(settings.recipient));
    logbook.postBalances.push(await instances.recipientToken.balanceOfLog(settings.sender));
    logbook.postBalances.push(await instances.recipientToken.balanceOfLog(settings.recipient));


    let totalGasUsed = instances.senderToken.gasUsed + instances.senderAgent.gasUsed + instances.recipientToken.gasUsed + instances.recipientAgent.gasUsed
    console.log(`Sequence iteration ${i} finished in ${Math.floor(stopwatch.read(0) / 1000)} seconds. Gas used: ${totalGasUsed}`);
    stopwatch.reset();

    logbook.settings = settings;
    logbook.instances = instances;
    fs.writeJSONSync('./utils/logbook.json', logbook);

    try {
      await require('./utils/sendLogbookToDb')(logbook, i, settings.truncateDb);
    }
    catch {
      console.log('sendLogbookToDb(logbook,i) failed.');
    }
  }

};




async function deploy() {
  if (!settings.deploy) return false;
  console.log('deploy');
  settings.token.addresses[settings.senderNetwork] = await deployContract(settings.admin, tokenArtifact, settings.senderNetwork, [settings.initialBalance]);
  settings.token.addresses[settings.recipientNetwork] = await deployContract(settings.admin, tokenArtifact, settings.recipientNetwork, [settings.initialBalance]);
  settings.agent.addresses[settings.senderNetwork] = await deployContract(settings.admin, agentArtifact, settings.senderNetwork);
  settings.agent.addresses[settings.recipientNetwork] = await deployContract(settings.admin, agentArtifact, settings.recipientNetwork);
  fs.writeJSONSync('./utils/settings.json', settings);

  return true;
}



async function deployContract(msgSender, artifact, network, args = []) {
  console.log('deploying:', { network, args });
  const infura = new ethers.providers.InfuraProvider(network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  // const default = ethers.getDefaultProvider
  const ganache = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
  const provider = network === "ganache" ? ganache : infura;
  const privateKey = msgSender.privateKey;
  const wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  
  const deployment = await factory.deploy(...args);
  const result = await deployment.deployed();
  return result.address;
}



async function getEthersBalance(network, account) {
  const infura = new ethers.providers.InfuraProvider(network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  const ganache = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
  const provider = network === "ganache" ? ganache : infura;
  const wallet = new ethers.Wallet(account.privateKey, provider);
  const balance = await wallet.getBalance();
  const ethBalance = ethers.utils.formatEther(balance);
  return { network, contractAddress: '0x0', accountAddress: account.address, accountName: account.name, balance: ethBalance };

  // return `${network} ethers balance for  ${account.name}: ${ethBalance}`;
}


function createLogbook(c,instances){
  let logbook = new LogbookModel();
  logbook.c = c;
  logbook.hasErrors = false;
  logbook.senderNetwork = settings.senderNetwork;
  logbook.recipientNetwork = settings.recipientNetwork;
  recordPreBalances(logbook,instances);
  return logbook;
}

async function recordPreBalances(logbook,instances){
  logbook.preBalances.push(await getEthersBalance(settings.senderNetwork, settings.sender));
  logbook.preBalances.push(await getEthersBalance(settings.recipientNetwork, settings.sender));
  logbook.preBalances.push(await instances.senderToken.balanceOfLog(settings.sender));
  logbook.preBalances.push(await instances.senderToken.balanceOfLog(settings.recipient));
  logbook.preBalances.push(await instances.recipientToken.balanceOfLog(settings.sender));
  logbook.preBalances.push(await instances.recipientToken.balanceOfLog(settings.recipient));
}
function createInstances(){
  const instances = {};
  instances.burnAccount = ethersWrapper.genAccount();
  instances.hashPair = crypto.newSecretHashPair();
  instances.senderToken = new Contract(settings.senderNetwork, settings.sender, settings.token, tokenArtifact);
  instances.senderAgent = new Contract(settings.senderNetwork, settings.sender, settings.agent, agentArtifact); //agent/broker/gateway  
  instances.recipientToken = new Contract(settings.recipientNetwork, settings.sender, settings.token, tokenArtifact);
  instances.recipientAgent = new Contract(settings.recipientNetwork, settings.sender, settings.agent, agentArtifact);
  instances.senderAgent.timer.init(settings.timeoutSeconds);
  return instances;
}

function iterations(){
    //setup a counter to use synchronous 'x of y' loop. TODO: refactor
    let arr = [];
    for (let i = 0; i < settings.iterations; i++) {
      arr.push(i);
    }
    return arr;
}

module.exports = run;
