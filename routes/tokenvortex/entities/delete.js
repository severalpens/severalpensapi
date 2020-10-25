var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../_models/entities');




//delete by id
router.post("/:_id", bodyParser.json(), async function(req, res, next) {
  let result =  await ContractsModel.findByIdAndDelete(_id).exec();
  return res.send(result);
  });
  
    
//soft delete
  router.post("/soft/:_id", bodyParser.json(),async  function(req, res, next) {
    let _id = req.params._id;
    ContractsModel.updateOne({ _id }, { isActive: false }).then(result => {
      return res.send(result);
    });
  });
  

    
//delete and return the rest
router.post("/return/:_id", bodyParser.json(),async  function(req, res, next) {
  let _id = req.params._id;
  let user_id = req.user_id;
  await EntitiesModel.deleteOne({ _id}).exec();
  let entities = EntitiesModel.find({user_id}).exec();
  res.send(entities);
});

module.exports = router;
