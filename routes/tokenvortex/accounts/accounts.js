var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var AccountsModel = require("../models/mongodb/accounts");
var jwt = require('jsonwebtoken');
var deleteRouter = require("./delete");
var lockRouter = require("./lock");
var insertRouter = require("./insert");
var newRouter = require("./new");
var updateRouter = require("./update");
// var cors = require('cors');
// router.use(cors());
router.use('/delete',deleteRouter);
router.use('/lock',lockRouter);
router.use('/insert',insertRouter);
router.use('/new',newRouter);
router.use('/update',updateRouter);

router.get("/",  function(req, res, next) {
  const query = AccountsModel.find(); 
  query.setOptions({ lean : true });
  query.collection(AccountsModel.collection)
 query.or([{ owner: 'public' }, { owner: req._id }])
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
                locked: account.locked
              })
          }
          else{
            refinedAccounts.push(
              {
                _id: account._id,
                name: account.name,
                address: account.address,
                publicKey: account.publicKey,
                privateKey: account.privateKey,
                mnemonic: account.mnemonic,
                locked: account.locked

              })
   
          }

        });
        return res.send(refinedAccounts);
      }
    });
  });

  
// router.get("/associative", bodyParser.json(), function(req, res, next) {
//     AccountsModel.find()
//       .collection(AccountsModel.collection)
//       .exec((err, body) => {
//         if (err != null) {
//           return res.send(err);
//         } else {
//           let assocAccounts = {};
//           body.forEach(account => {
//             assocAccounts[account._id] = account;
//           });
//           return res.send(assocAccounts);
//         }
//       });
//   });

  
// router.post("/:_id", bodyParser.json(), function(req, res, next) {
//   let _id = req.params._id;
//   AccountsModel.find({ _id }).exec((err, result) => {
//     res.send(result);
//   });
// });


// router.get("/:address", bodyParser.json(), function(req, res, next) {
//   let address = req.params.address;
//   AccountsModel.find({ address }).exec((err, result) => {
//     res.send(result);
//   });
// });

// router.get("/:_id/islocked", bodyParser.json(), function(req, res, next) {
//   let _id = req.params._id;
//   const query = AccountsModel.findOne({_id},(err,account) => {
//     res.send(account.locked);
//   }); // `query` is an instance of `Query`
// });

// router.get("/admin", bodyParser.json(), function(req, res, next) {
//   AccountsModel.find({}).exec((err, result) => {
//     res.send(result[0]);
//   });
// });

router.get("/:network/:address/balance", bodyParser.json(), function(req, res, next) {
  let address = req.query.address;
  let network = req.query.network;    
  let provider = ethers.getDefaultProvider(network);

  provider.getBalance(address).then((balance) => {
      let etherString = ethers.utils.formatEther(balance);
      res.send(etherString);
  });
});



module.exports = router;
