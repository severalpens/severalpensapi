var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var AccountsModel = require("../models/mongodb/accounts");
var deleteRouter = require("./delete");
var lockRouter = require("./lock");
var insertRouter = require("./insert");
var newRouter = require("./new");
var updateRouter = require("./update");
router.use('/delete',deleteRouter);
router.use('/lock',lockRouter);
router.use('/insert',insertRouter);
router.use('/new',newRouter);
router.use('/update',updateRouter);

router.get("/",  function(req, res, next) {
  const query = AccountsModel.find(); 
  query.setOptions({ lean : true });
  query.collection(AccountsModel.collection)
  query.or([{ user_id: 'public' }, { user_id: req.user_id }])
  query.where('isActive').equals(true)
  query.exec((err, accounts) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        let refinedAccounts = [] //avoid sending back bytecode and abi
        accounts.forEach(account => {
          if(account.locked){
            refinedAccounts.push(
              {
                _id: account._id,
                name: account.name,
                address: account.address,
                blaance: account.balance,
                isLocked: account.isLocked
              })
          }
          else{
            refinedAccounts.push(account);
          }
        return res.send(refinedAccounts);
      })
      }
    
  });
  });



module.exports = router;
