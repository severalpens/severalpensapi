var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var MedeventsModel = require('../../models/medevents');

router.post("/:_id", bodyParser.json(), function(req, res, next) {
  console.log('medevents update reached');
  let _id = req.body._id;
  console.log(_id);
  let medevent = req.body;
  medevent.user_id = req.user_id;

  if (_id) {
    MedeventsModel.updateOne(
      { _id },
      medevent,
      function(err, result) {
        if(err){res.send(err)}
        res.send([req.body, result]);
      }
    );
  }
});





module.exports = router;
