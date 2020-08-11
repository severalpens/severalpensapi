var ethers = require('ethers')

class TimeHelper{
  
  constructor(reclaimTimeInSeconds){
    this.reclaimTimeInSeconds = reclaimTimeInSeconds;
    this.reset()
  }

  reset(){
    let newDate = new Date();
    
    this.periodStart = newDate.getTime();
    this.periodStartSeconds = Math.floor(this.periodStart / 1000);    

    this.periodEnd = this.periodStart + (this.reclaimTimeInSeconds * 1000);
    this.periodEndSeconds = Math.floor(this.periodEnd / 1000);
    this.isExpired = false;
  }

  async getBlock(network){
    var provider = ethers.getDefaultProvider(network);
    this.latestBlock = await  provider.getBlock('latest');
    
  } 

  static async sleep(seconds) {
    let milliseconds = seconds * 1000;
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  expired(){
    let currentTime = new Date().getTime();
    this.isExpired = currentTime >  this.periodEnd;
    return this.isExpired;

  }

}

module.exports = TimeHelper;
