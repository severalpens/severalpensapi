var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var MedsModel = require('../../models/meds');

router.post("/:_id", bodyParser.json(), function(req, res, next) {
  console.log('meds update reached');
  let _id = req.body._id;
  console.log(_id);
  let med = req.body;
  med.user_id = req.user_id;

  if (_id) {
    MedsModel.updateOne(
      { _id },
      med,
      function(err, result) {
        if(err){res.send(err)}
        res.send([req.body, result]);
      }
    );
  }
});





module.exports = router;
