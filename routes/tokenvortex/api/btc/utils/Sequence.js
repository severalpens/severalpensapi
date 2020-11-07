const statman = require('statman');
const stopwatch = new statman.Stopwatch();

class Sequence {
  constructor(entities, settings, instances) {
    this.transactionId = '';
    this.entities  = entities;
    this.settings = settings;
    this.instances = instances;
  }

  async runTxs() {
    let results = [];
    results.push(await this.instances.senderToken.runSimple(
      'approve',
      [
        this.instances.senderAgent.address, 
        this.settings.tokenAmount
      ]
    ));

    this.instances.senderAgent.timer.init(this.settings.timeoutSeconds);
    let exitTxResult  = await this.instances.senderAgent.runSimple(
      'exitTransaction',
      [
        this.instances.burnAccount.address, 
        this.instances.hashPair.hash, 
        this.instances.senderAgent.timer.periodEndSeconds,
        this.instances.senderToken.address, 
        this.settings.tokenAmount
      ]
    );

    this.transactionId = exitTxResult.events[exitTxResult.events.length - 1].args.transactionId;
    results.push(exitTxResult);


    if(this.checkTimeout(stopwatch,false)){
      results.push(await this.instances.senderAgent.runSimple(
      'reclaimTransaction',
      [
        this.transactionId
      ]
    ));
    }

    if(this.checkTimeout(stopwatch,true)){
      results.push(await this.instances.recipientAgent.runSimple(
      'add',
      [
        this.instances.senderAgent.address,
        this.transactionId,
        this.instances.burnAccount.address,
        this.instances.hashPair.hash,
        this.instances.senderAgent.timer.periodEndSeconds,
        this.instances.recipientToken.address,
        this.settings.tokenAmount
      ]
    ));
    }

    if(this.checkTimeout(stopwatch,true)){
      results.push(await this.instances.recipientAgent.runSimple(
      'entryTransaction',
      [
        this.settings.tokenAmount,
        this.entities.recipient.body.address,
        this.transactionId,
        this.instances.hashPair.secret
      ]
    ));
    }

    if(this.checkTimeout(stopwatch,true)){
      results.push(await this.instances.senderAgent.runSimple(
      'update',
      [
        this.instances.recipientAgent.address,
        this.transactionId,
        this.instances.hashPair.secret,
      ]
    ));
    }
    return results;
}

checkTimeout(stopwatch,preTimeout) {
  let timeSplit = Math.floor(stopwatch.read(0) / 1000);
  let expired = timeSplit >= this.settings.timeoutSeconds;
  if (preTimeout && !expired) {
    return true;
  }
  if (!preTimeout && expired) {
    return true;
  }
  return false;
}
}


module.exports = Sequence;