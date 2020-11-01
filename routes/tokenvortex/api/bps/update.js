var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var BpsModel = require('../../models/bps');

router.post("/:_id", bodyParser.json(), function(req, res, next) {
  console.log('bps update reached');
  let _id = req.body._id;
  console.log(_id);
  let bp = req.body;
  console.log(bp);
  bp.user_id = req.user_id;

  if (_id) {
    BpsModel.updateOne(
      { _id },
      bp,
      function(err, result) {
        if(err){res.send(err)}
        res.send([req.body, result]);
      }
    );
  }
});





module.exports = router;
