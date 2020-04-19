var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var UsersModel = require("../models/mongodb/users");
var insertRouter = require("./insert");
var bcrypt = require('bcrypt')


var cors = require('cors');
router.use(cors());


router.post("/reigster", bodyParser.json(), function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  UsersModel.findOne({username},(err,user) => {
    if(err){res.status(401).send(err) }
    let validPassword = bcrypt.compareSync(user.password,password);
    if(validPassword){
      res.send(username)
    }
  })
});

router.post("/login", bodyParser.json(), function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  UsersModel.findOne({username},(err,user) => {
    if(err){res.status(401).send(err) }
    let validPassword = bcrypt.compareSync(user.password,password);
    if(validPassword){
      res.send(username)
    }
  })
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
