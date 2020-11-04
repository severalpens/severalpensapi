const sequenceRunner = {}
const ethersWrapper = require('./utils/ethersWrapper');
const Contract = require('./utils/Contract');
const Sequence = require('./utils/Sequence');
const BtcModel = require('../../models/btc.js');
const crypto = require('./utils/cryptoWrapper');
const agentArtifact = require('./build/contracts/BurnToClaim.json');

sequenceRunner.run = async (btc) => {
  const settings = btc.settings;
  const sender = await EntitiesModel.findById(btc.settings.sender_id).lean().exec();
  const recipient = await EntitiesModel.findById(btc.settings.recipient_id).lean().exec();
  const token = await EntitiesModel.findById(btc.settings.token_id).lean().exec();
  const agent = require('./utils/btc.json');
  const entities = {sender, recipient, token,agent}

  const burnAccount = ethersWrapper.genAccount();
  const hashPair = crypto.newSecretHashPair();
  const senderToken = new Contract(settings.senderNetwork, sender, token, token.body.abi);
  const senderAgent = new Contract(settings.senderNetwork, sender, agent, agentArtifact); //agent/broker/gateway  
  const recipientToken = new Contract(settings.recipientNetwork, sender, token, token.body.abi);
  const recipientAgent = new Contract(settings.recipientNetwork, sender, agent, agentArtifact);
  senderAgent.timer.init(settings.timeoutSeconds);
  const instances = {burnAccount, hashPair, senderToken, senderAgent, recipientToken, recipientAgent}
  const sequence = new Sequence(entities,settings, instances);
  btc.results = await sequence.runTxs();
  await BtcModel.findByIdAndUpdate(btc._id,btc);
  return btc;
};

module.exports = sequenceRunner;
