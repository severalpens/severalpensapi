var express = require("express");
var router = express.Router();
var admin = require('../../seed/seedFiles/admin.json')
const admin_id = '5f8f88e5d28b37394459bbba';
const locked_user_id = '5fa5f64abdae5d0a0cd54ac4';
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var deleteRouter = require("./delete");
var insertRouter = require("./insert");
var updateRouter = require("./update");
var deployRouter = require("./deploy");

router.use('/delete',deleteRouter);
router.use('/deploy',deployRouter);
router.use('/insert',insertRouter);
router.use('/update',updateRouter);

const EntitiesModel = require("../../models/entities");


router.get("/", async function(req, res, next) {
  const query = EntitiesModel.find({});
  query.or([{ user_id: req.user_id }, { user_id: locked_user_id }])
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
  const query = EntitiesModel.find({});  
  query.or([{ user_id }, { user_id: locked_user_id }]);
  switch (entityType) {
    case 'customFields':
      query.where('entityType').in( ['hashPair','generic','randomAccount']);
      break;
    default:
      query.where('entityType').equals(entityType);
      break;
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
