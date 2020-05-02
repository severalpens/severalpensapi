var fs = require('fs');
var path = require('path');
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var deleteRouter = require("./delete");
var insertRouter = require("./insert");
var updateRouter = require("./update");
var lockRouter = require("./lock");

var cors = require('cors');
router.use(cors());


router.use('/lock',lockRouter);
router.use('/delete',deleteRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);

var ContractsModel = require('../models/mongodb/contracts');

router.get("/", bodyParser.json(), function(req, res, next) {
  ContractsModel.find({})
    .collection(ContractsModel.collection)
    .exec((err, contracts) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        let refinedContracts = [] //avoid sending back bytecode and abi
        contracts.forEach(contract => {
          const regex = /\n/gi;
          let sc1 = contract.soliditycode;
           sc1 = contract.soliditycode.split(regex);

         // let sc2 = sc1.replace('\n',' ');
         // let sc3 = sc2.replace("\\n",' ');
          refinedContracts.push(
              {
                name: contract.name,
                addresses: contract.addresses,
                soliditycode: sc1
              })
  
        });
        return res.jsonp(refinedContracts);
      }
    });
});

// router.get("/", bodyParser.json(), function(req, res, next) {
//   ContractsModel.find({isActive: true})
//     .collection(ContractsModel.collection)
//     .exec((err, contracts) => {
//       if (err != null) {
//         return res.send(err);
//       } 
//       else {
//         return res.send(contracts);
//       }
//     });
// });


router.get("/associative", bodyParser.json(), function(req, res, next) {
  ContractsModel.find()
    .collection(ContractsModel.collection)
    .exec((err, body) => {
      if (err != null) {
        return res.send(err);
      } else {
        let associativeList = {};
        body.forEach(account => {
          associativeList[account._id] = account;
        });
        return res.send(associativeList);
      }
    });
});




router.get("/:id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  ContractsModel.findOne({ _id }).exec((err, result) => {
    if(err){
      return res.send(err)
    }else{
      res.send(result);
    }
  });
});

router.get("/:address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  ContractsModel.findOne({ _id }).exec((err, result) => {
    res.send(result);
  });
});


router.get("/:network/:_id/address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  let network = req.params.network;
   ContractsModel.findOne({_id}).then((result) => {
      res.send(
        { 
          _id: _id,
          network: network,
          address: result.addresses[network]
        }
      )
   })
});



router.get("/:_id/islocked", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  ContractsModel.findOne({_id},(err,result) => {
    return res.send(result[0].locked);
  }); 
});




module.exports = router;
