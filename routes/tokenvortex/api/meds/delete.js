var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var MedsModel = require('../../models/meds');





//delete by id
router.post("/:_id", bodyParser.json(), async function(req, res, next) {
  let _id = req.params._id
  let result = {};
    result =  await MedsModel.findByIdAndDelete(_id).exec();
  return res.send(result);
  });
  
    
//soft delete
  router.post("/soft/:_id", bodyParser.json(),async  function(req, res, next) {
    let _id = req.params._id;
    if(_id !== admin_id){
      MedsModel.updateOne({ _id }, { isActive: false }).then(result => {
      return res.send(result);
    });
  }
  });
  




module.exports = router;
