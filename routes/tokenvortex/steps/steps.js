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

var StepsModel = require('../models/mongodb/steps');
var SequencesModel = require('../models/mongodb/sequences');


router.get("/:sequence_id", async function(req, res, next) {
  let user_id = req.user_id;
  let _id = req.params.sequence_id;

  let sequence = await SequencesModel
  .findOne({user_id,_id})
  .exec();

  StepsModel
  .find({})
  .where('_id').in(sequence.step_ids)
  .exec((err, steps) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(steps);
      }
    });
});


router.get("/associative", bodyParser.json(), function(req, res, next) {
  StepsModel.find()
    .collection(StepsModel.collection)
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
  StepsModel.findOne({ _id }).exec((err, result) => {
    if(err){
      return res.send(err)
    }else{
      res.send(result);
    }
  });
});

router.get("/:address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  StepsModel.findOne({ _id }).exec((err, result) => {
    res.send(result);
  });
});


router.get("/:network/:_id/address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  let network = req.params.network;
   StepsModel.findOne({_id}).then((result) => {
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
  StepsModel.findOne({_id},(err,result) => {
    return res.send(result[0].locked);
  }); 
});




module.exports = router;
