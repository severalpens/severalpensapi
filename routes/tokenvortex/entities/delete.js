var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var EntitiesModel = require('../models/mongodb/entities');





router.post("/:_id", bodyParser.json(), async function(req, res, next) {
    let _id = req.params._id;
    let user_id = req.user_id;
    await EntitiesModel.deleteOne({ _id}).exec();
    let entities = EntitiesModel.find({user_id}).exec();
    res.send(entities);
  });
  
    




module.exports = router;
