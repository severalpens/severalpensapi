var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var BtcModel = require('../../models/btc');
const admin_id = '5f8f88e5d28b37394459bbba';




//delete by id
router.post("/:_id", bodyParser.json(), async function(req, res, next) {
  let _id = req.params._id
  let result = {};
  if(_id !== admin_id){
    result =  await BtcModel.findByIdAndDelete(_id).exec();
  }
  return res.send(result);
  });
  
    
//soft delete
  router.post("/soft/:_id", bodyParser.json(),async  function(req, res, next) {
    let _id = req.params._id;
    if(_id !== admin_id){
      BtcModel.updateOne({ _id }, { isActive: false }).then(result => {
      return res.send(result);
    });
  }
  });
  

    
//delete and return the rest
router.post("/return/:_id", bodyParser.json(),async  function(req, res, next) {
  let _id = req.params._id;
  let user_id = req.user_id;
  if(_id !== admin_id){

  await BtcModel.deleteOne({ _id}).exec();
  let btc = BtcModel.find({user_id}).exec();
  res.send(btc);
  }
});

module.exports = router;
