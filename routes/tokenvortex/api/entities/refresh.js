var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../../models/entities');
const functions = require('./functions');

router.post("/:_id", bodyParser.json(), async function (req, res, next) {
  let entity = req.body;
  entity.user_id = req.user_id;
  entity = functions.customise(entity);
  _id = req.params._id;
  user_id = req.user_id;
    await EntitiesModel.updateOne({_id,user_id}, entity)
    let result = await EntitiesModel.findById(_id).exec();
    res.send(result);
});


module.exports = router;
