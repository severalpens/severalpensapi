const statman = require('statman');
const stopwatch = new statman.Stopwatch();

const TimeHelper = require('./TimeHelper');
class Sequence {
  constructor(settings, instances, logbook,c) {
    this.settings = settings;
    this.instances = instances;
    this.logbook = logbook;
    this.c = c;
    this.outputs = {};
    
    this.seedInits(settings, instances);
    this.seedTxs(settings, instances);

  }


  async runInitMethods() {
    console.log('pre-transfer setup (init) transactions:');
    stopwatch.start();
    for (const tx of this.inits) {
      let instance = this.instances[tx.instance];
      await instance.run(tx.method,tx.args, stopwatch, this.logbook,this.c);
    }
    stopwatch.reset();
  }


  
  async runTxs() {
    stopwatch.start();
    let i = 0;
    for (const tx of this.txs) {
      let t = this.txs[i];    
      let instance = this.instances[t.instance];
      if (this.checkTimeout(t,stopwatch)) {        
        let txLog = await instance.run(t.method,t.args, stopwatch,t.isPayable);
        if(!t.isPayable){
          this.outputs[t.outputName] = txLog.result;
          this.seedTxs();
        }
        this.logbook.logs.push(txLog);
      }
      i++;
    }
    stopwatch.reset();
  }


  

  checkTimeout(tx,stopwatch) {
    let timeSplit = Math.floor(stopwatch.read(0) / 1000);
    let expired = timeSplit >= this.settings.timeoutSeconds;
    if (tx.preTimeout && !expired) {
      return true;
    }
    if (!tx.preTimeout && expired) {
      return true;
    }
    return false;
  }

  seedTxs() {
    let settings = this.settings;
    let outputs = this.outputs;
    let instances = this.instances;

    this.txs = [
      {
        isPayable: true,
        preTimeout: true,
        instance: 'senderToken',
        method: 'approve',
        args: [
          instances.senderAgent.address,
          settings.tokenAmount
        ],
      },
      {
        isPayable: true,
        preTimeout: true,
        instance: 'senderAgent',
        method: 'exitTransaction',
        args: [
          instances.burnAccount.address,
          instances.hashPair.hash,
          instances.senderAgent.timer.periodEndSeconds,
          instances.senderToken.address,
          settings.tokenAmount
        ],
      },      
      {
        isPayable: false,
        outputName: 'transactionId',
        preTimeout: true,
        instance: 'senderAgent',
        method: 'getTransactionId',
        args: [instances.hashPair.hash],
      },
      {
        isPayable: true,
        preTimeout: false,
        instance: 'senderAgent',
        method: 'reclaimTransaction',
        args: [
          outputs.transactionId
        ],
      },
      {
        isPayable: true,
        preTimeout: true,
        instance: 'recipientAgent',
        method: 'add',
        args: [
          instances.senderAgent.address,
          outputs.transactionId,
          instances.burnAccount.address,
          instances.hashPair.hash,
          instances.senderAgent.timer.periodEndSeconds,
          instances.recipientToken.address,
          settings.tokenAmount

        ],
      },
      {
        isPayable: true,
        preTimeout: true,
        instance: 'recipientAgent',
        method: 'entryTransaction',
        args: [
          settings.tokenAmount,
          settings.recipient.address,
          outputs.transactionId,
          instances.recipientToken.address,
          instances.hashPair.secret

        ],
      },
      {
        isPayable: true,
        preTimeout: true, 
        instance: 'senderAgent',
        method: 'update',
        args: [
          instances.recipientAgent.address,
          outputs.transactionId,
          instances.hashPair.secret,
        ],
      },
    ]
  }

  // seedTxs() {
  //   let settings = this.settings;
  //   let instances = this.instances;

  //   this.txs = [
  //     {
  //       preTimeout: true,
  //       instance: 'senderAgent',
  //       method: 'getTransactionId',
  //       args: ['0x45f3ce4e109c3c1b615b9c9315da181fa05f005fd2cbd70e6a762f79b9aa06d8'],
  //     },      
  //   ]
  // }
  
  seedInits() {
    let settings = this.settings;
    let instances = this.instances;

    this.inits = [
      {
        instance: 'senderAgent',
        method: 'registerContract',
        args: [
          instances.recipientAgent.address
        ],
      },
      {
        instance: 'recipientAgent',
        method: 'registerContract',
        args: [
          instances.senderAgent.address
        ],
      },
      {
        instance: 'senderToken',
        method: 'transfer',
        args: [
          instances.senderAgent.address,
          1000
        ],
      },
      {
        instance: 'recipientToken',
        method: 'transfer',
        args: [
          instances.recipientAgent.address,
          1000
        ],
      },

    ];
  }
}

module.exports = Sequence;