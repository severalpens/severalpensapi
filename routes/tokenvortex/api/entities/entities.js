var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var deleteRouter = require("./delete");
var insertRouter = require("./insert");
var updateRouter = require("./update");

router.use('/delete',deleteRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);

const EntitiesModel = require("../../models/entities");


router.get("/",  function(req, res, next) {
  let user_id = req.user_id;
  const query = EntitiesModel.find({user_id}); 
  query.exec((err, entities) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(entities);
      }
    });
});


router.get("/:entityType",  function(req, res, next) {
  let user_id = req.user_id;
  let entityType = req.params.entityType;
  const query = EntitiesModel.find({user_id});
  
  if(entityType === 'customFields'){
    query.where('entityType').in( ['hashPair','generic','randomAccount']);
  }
  else{
    query.where('entityType').equals(entityType);
  }

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
