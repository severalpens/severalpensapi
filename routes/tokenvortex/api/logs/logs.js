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

var LogsModel = require('../../models/logs');


router.get("/",  function(req, res, next) {
  const query = LogsModel.find(); 
  query.setOptions({ lean : true });
  query.collection(LogsModel.collection)
  query.or([{ user_id: 'public' }, { user_id: req.user_id }])
  query.where('isActive').equals(true)
  query.exec((err, logs) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(logs);
      }
    });
});


router.get("/associative", bodyParser.json(), function(req, res, next) {
  LogsModel.find()
    .collection(LogsModel.collection)
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
  LogsModel.findOne({ _id }).exec((err, result) => {
    if(err){
      return res.send(err)
    }else{
      res.send(result);
    }
  });
});

router.get("/:address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  LogsModel.findOne({ _id }).exec((err, result) => {
    res.send(result);
  });
});


router.get("/:network/:_id/address", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  let network = req.params.network;
   LogsModel.findOne({_id}).then((result) => {
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
  LogsModel.findOne({_id},(err,result) => {
    return res.send(result[0].locked);
  }); 
});




module.exports = router;