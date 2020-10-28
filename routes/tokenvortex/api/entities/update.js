var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../../models/entities');
const admin_id = '5f8f88e5d28b37394459bbba';

router.post("/:_id", bodyParser.json(), async function (req, res, next) {
  let entity = req.body;
  entity.user_id = req.user_id;
  if(entity._id !== admin_id){
    EntitiesModel.updateOne(
      { 
        _id: req.params._id, 
        user_id: req.user_id
       },
      entity,
    )
    .exec((err,result) => {
      if(err){
        console.log(err);
        res.send(err)
      }
      console.log(result);
      res.send(result)
    });
  }
});


module.exports = router;
