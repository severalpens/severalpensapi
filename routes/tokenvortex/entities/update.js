var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../models/mongodb/entities');



router.post("/:_id", bodyParser.json(), async function (req, res, next) {
  let _id = req.params._id;
  let entity = req.body;
  console.log(entity);
  delete entity._id;
  entity.user_id = req.user_id;
  await EntitiesModel.updateOne({ _id }, entity).exec();
  let updatedEntity = await EntitiesModel.findById(_id).exec();
  res.send(updatedEntity);
});


module.exports = router;
