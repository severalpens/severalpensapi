var moment = require('moment'); // require
const statman = require('statman');
const stopwatch = new statman.Stopwatch();
const dayjs = require('dayjs')


class TimeHelper{
  
  constructor(){
  }

   init(timeoutSeconds){
    this.periodStart = new Date().getTime();
    this.periodStartSeconds = Math.floor(this.periodStart / 1000);  
    this.periodEndSeconds = this.periodStartSeconds + timeoutSeconds;
    this.isExpired = false;
  }


  static async sleep(seconds) {
    console.log('start sleep:',dayjs().format());
    let milliseconds = seconds * 1000;
    await new Promise(resolve => setTimeout(resolve, milliseconds));
    console.log('end sleep:',dayjs().format());
  }  
  
  static  YYYYMMDDHHmmss() {
    return  moment().format('YYYYMMDDHHmmss');
  }

  expired(){
    let currentTime = new Date().getTime() / 1000;
    this.isExpired = currentTime >  this.periodEnd;
    return this.isExpired;

  }

}

module.exports = TimeHelper;
