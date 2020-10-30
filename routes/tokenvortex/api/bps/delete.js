var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var BpsModel = require('../../models/bps');





//delete by id
router.post("/:_id", bodyParser.json(), async function(req, res, next) {
  let _id = req.params._id
  let result = {};
    result =  await BpsModel.findByIdAndDelete(_id).exec();
  return res.send(result);
  });
  
    
//soft delete
  router.post("/soft/:_id", bodyParser.json(),async  function(req, res, next) {
    let _id = req.params._id;
    if(_id !== admin_id){
      BpsModel.updateOne({ _id }, { isActive: false }).then(result => {
      return res.send(result);
    });
  }
  });
  




module.exports = router;
