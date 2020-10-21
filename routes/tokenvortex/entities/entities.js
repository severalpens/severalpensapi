var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var deleteRouter = require("./delete");
var insertRouter = require("./insert");
var updateRouter = require("./update");
var seedRouter = require("./seed");

router.use('/delete',deleteRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);
router.use('/seed',seedRouter);

const EntitiesModel = require("../models/mongodb/entities");


router.get("/",  function(req, res, next) {
  let user_id = req.user_id;
  const query = EntitiesModel.find({user_id}); 
  query.where('entityType').nin(['contract','account'])
  query.exec((err, entities) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(entities);
      }
    });
});


router.get("/all",  function(req, res, next) {
  let user_id = req.user_id;
  const query = EntitiesModel.find({user_id}); 
  //query.where('entityType').nin(['contract','account'])
  query.exec((err, entities) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(entities);
      }
    });
});


router.get("/:_id",  function(req, res, next) {
  const query = EntitiesModel.findById(req.params._id); 
  query.where({ user_id: req.user_id })
  query.where('isActive').equals(true)
  query.exec((err, entities) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(entities);
      }
    });
});


module.exports = router;
