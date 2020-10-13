var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var deleteRouter = require("./delete");
var truncateRouter = require("./truncate");
var insertRouter = require("./insert");
var updateRouter = require("./update");
var lockRouter = require("./lock");
var runRouter = require("./run")
var ethBalanceRouter = require("./ethbalance")

router.use('/lock',lockRouter);
router.use('/delete',deleteRouter);
router.use('/truncate',truncateRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);
router.use('/run',runRouter);
router.use('/ethbalance',ethBalanceRouter);

var SequencesModel = require('../models/mongodb/sequences');


router.get("/",  function(req, res, next) {
  const query = SequencesModel.find(); 
  query.setOptions({ lean : true });
  query.collection(SequencesModel.collection)
  query.or([{ user_id: 'public' }, { user_id: req.user_id }])
  query.where('isActive').equals(true)
  query.exec((err, sequences) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(sequences);
      }
    });
});


router.get("/associative", bodyParser.json(), function(req, res, next) {
  SequencesModel.find()
    .collection(SequencesModel.collection)
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
  SequencesModel.findOne({ _id }).exec((err, result) => {
    if(err){
      return res.send(err)
    }else{
      res.send(result);
    }
  });
});

router.get("/:address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  SequencesModel.findOne({ _id }).exec((err, result) => {
    res.send(result);
  });
});


router.get("/:network/:_id/address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  let network = req.params.network;
   SequencesModel.findOne({_id}).then((result) => {
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
  SequencesModel.findOne({_id},(err,result) => {
    return res.send(result[0].locked);
  }); 
});




module.exports = router;
