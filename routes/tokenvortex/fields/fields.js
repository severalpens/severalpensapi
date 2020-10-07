var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var deleteRouter = require("./delete");
var insertRouter = require("./insert");
var updateRouter = require("./update");
var lockRouter = require("./lock");
router.use('/lock',lockRouter);
router.use('/delete',deleteRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);

var FieldsModel = require('../models/mongodb/fields');
var HashPair = require('../models/mongodb/fields');
var RandomAccount = require('../models/mongodb/fields');
var Timer = require('../models/mongodb/fields');
var Generic = require('../models/mongodb/fields');



router.get("/",  function(req, res, next) {
  const query = FieldsModel.find(); 
  query.setOptions({ lean : true });
  query.collection(FieldsModel.collection)
  query.or([{ user_id: 'public' }, { user_id: req.user_id }])
  query.exec((err, fields) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(fields);
      }
    });
});


router.get("/associative", bodyParser.json(), function(req, res, next) {
  FieldsModel.find()
    .collection(FieldsModel.collection)
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
  FieldsModel.findOne({ _id }).exec((err, result) => {
    if(err){
      return res.send(err)
    }else{
      res.send(result);
    }
  });
});

router.get("/:address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  FieldsModel.findOne({ _id }).exec((err, result) => {
    res.send(result);
  });
});


router.get("/:network/:_id/address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  let network = req.params.network;
   FieldsModel.findOne({_id}).then((result) => {
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
  FieldsModel.findOne({_id},(err,result) => {
    return res.send(result[0].locked);
  }); 
});




module.exports = router;
