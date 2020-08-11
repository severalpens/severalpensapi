const ethers = require("ethers");
const Contract = require('./utils/Contract');
const accountArtifacts = require('./utils/artifactWrappers/accounts')
const contractArtifacts = require('./utils/artifactWrappers/contracts');
const crypto = require('./utils/cryptoWrapper');
const ethersWrapper = require('./utils/ethersWrapper');
const TimeHelper = require('./utils/TimeHelper');
const logger = require('./utils/Logger');

//settings
const version = 7;
const tokenArtifact = contractArtifacts.basicToken;
const agentArtifact = contractArtifacts.burnToClaim[version]; 
const senderNetwork = 'rinkeby';
const recipientNetwork = 'rinkeby';
const sender = accountArtifacts.alice;
const burnAccount = ethersWrapper.genAccount();
const recipient = accountArtifacts.bob;


const senderToken = new Contract(senderNetwork, sender, tokenArtifact);
const senderAgent = new Contract(senderNetwork, sender,agentArtifact); //agent/broker/gateway
const recipientToken = new Contract(recipientNetwork, recipient, tokenArtifact);
const recipientAgent = new Contract(recipientNetwork, recipient,agentArtifact);
const reclaimTimer = new TimeHelper(2);
const hashPair = crypto.newSecretHashPair();
const tokenAmount = 1;


(async function asyncRunner() {
  let args = [
    senderAgent.address,
    tokenAmount
  ]
  await senderToken.run2('approve',args);

 args = [
  burnAccount.address,
  hashPair.hash,
  reclaimTimer.periodEndSeconds,
  senderToken.address,
  tokenAmount
]
let exitTx_receipt = await senderAgent.run2('exitTransaction', args);
console.log('exitTransaction completed');

// from the transaction receipt get the transaction ID
let transactionId = await exitTx_receipt.events[2].args.transactionId;


//*
//**
//***
// If sleep time > reclaimTimer.periodEnd then transfer is rejected.
//**************************************************/
reclaimTimer.reset(); //to take into account time of exitTx
await TimeHelper.sleep(1);
//**************************************************/
//***
//**
//*

//*
//**
//***
//transfer timeout
if(reclaimTimer.expired()){
  const reclaimTx_receipt = await senderAgent.run2('reclaimTransaction',[transactionId]);
  console.log('reclaim completed');
}
//***
//**
//*

//*
//**
//***
//transfer still within timeout period
else{
  args = [
    senderAgent.address,
    transactionId,
    burnAccount.address,
    hashPair.hash,
    reclaimTimer.periodEndSeconds,
    recipientToken.address,
    tokenAmount
  ];
  console.log(args);
  let addTx_receipt = await recipientAgent.run2('add',args);
  console.log('add completed');

 args = [
    tokenAmount,
    recipient.address,
    transactionId,
    hashPair.secret
  ];
  let entryTx_receipt = await recipientAgent.run2('entryTransaction',args);
  console.log('entryTransaction completed');

  args = 
    [
      recipientAgent.address,
      transactionId,
      hashPair.secret,
    ];
  let updateTx_receipt = await recipientAgen.run2('update',
    );
    console.log('update completed');

} 
//***
//**
//*


})()





