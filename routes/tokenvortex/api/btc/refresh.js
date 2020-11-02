var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var BtcModel = require('../../models/btc');
const functions = require('./functions');
const admin_id = '5f8f88e5d28b37394459bbba';

router.post("/:_id", bodyParser.json(), async function (req, res, next) {
  let entity = req.body;
  entity.user_id = req.user_id;
  entity = functions.customise(entity);
  _id = req.params._id;
  user_id = req.user_id;
  if(_id !== admin_id){
    await BtcModel.updateOne({_id,user_id}, entity)
  }
  
  let result = await BtcModel.findById(_id).exec();
  res.send(result);
});


module.exports = router;
