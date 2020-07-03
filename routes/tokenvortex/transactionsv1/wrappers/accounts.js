
class Accounts {
    props = {
        name:  '',
        address:  '',
        owner:  '',
        privateKey:  '',
        publicKey:  '',
        mnemonic:  '',
        locked:  '',
        isActive:  '',
    }
  
    constructor(){
        this.AccountsModel = require('../models/accounts')
    }

    save(){
        
    }
  }