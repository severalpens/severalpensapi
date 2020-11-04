const statman = require('statman');
const stopwatch = new statman.Stopwatch();

class Sequence {
  constructor(entities, settings, instances) {
    this.transactionId = '';
    this.entities  = entities;
    this.settings = settings;
    this.instance = instances;
  }

  async runTxs() {
    let results = [];
    stopwatch.start();
    results.push(await this.instances.senderToken.run(
      'approve',
      [
        this.instances.senderAgent.address, 
        this.settings.tokenAmount
      ],
      stopwatch
    ));

    results.push(await this.instances.senderAgent.run(
      'exitTransaction',
      [
        this.instances.burnAccount.address, 
        this.instances.hashPair.hash, 
        this.instances.senderAgent.timer.periodEndSeconds,
        this.instances.senderToken.address, 
        this.settings.tokenAmount
      ],
      stopwatch
    ));
    this.transactionId = log.completedTx.events[log.completedTx.events.length - 1].args.transactionId;


    if(checkTimeout(stopwatch,false)){
      results.push(await instances.senderAgent.run(
      'reclaimTransaction',
      [
        this.transactionId
      ],
      stopwatch
    ));
    }

    if(checkTimeout(stopwatch,true)){
      results.push(await this.instances.recipientAgent.run(
      'add',
      [
        this.instances.senderAgent.address,
        this.transactionId,
        this.instances.burnAccount.address,
        this.instances.hashPair.hash,
        this.instances.senderAgent.timer.periodEndSeconds,
        this.instances.recipientToken.address,
        this.settings.tokenAmount
      ],
      stopwatch
    ));
    }

    if(checkTimeout(stopwatch,true)){
      results.push(await instances.recipientAgent.run(
      'entryTransaction',
      [
        this.settings.tokenAmount,
        this.entities.recipient.body.address,
        this.transactionId,
        this.instances.recipientToken.address,
        this.instances.hashPair.secret
      ],
      stopwatch
    ));
    }

    if(checkTimeout(stopwatch,true)){
      results.push(await instances.senderAgent.run(
      'update',
      [
        this.instances.recipientAgent.address,
        this.transactionId,
        this.instances.hashPair.secret,
      ],
      stopwatch
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