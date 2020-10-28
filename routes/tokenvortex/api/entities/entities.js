var express = require("express");
var router = express.Router();
var admin = require('../../seed/seedFiles/admin.json')
const admin_id = '5f8f88e5d28b37394459bbba';
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


router.get("/", async function(req, res, next) {
  let user_id = req.user_id;
  const query = EntitiesModel.find({});
  query.or([{ user_id }, { _id: admin_id }])
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
  switch (entityType) {
    case 'customFields':
      query.where('entityType').in( ['hashPair','generic','randomAccount']);
      break;
      case 'account':
        query.or([{ user_id }, { _id: admin_id }]);
        query.where('entityType').equals('account');
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
        if(entityType === 'account'){
         entities.push(admin);
        }
        return res.send(entities);
      }
    });
});


module.exports = router;
