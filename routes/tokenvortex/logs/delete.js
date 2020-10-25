var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var LogsModel = require('../_models/logs');





router.post("/:_id", bodyParser.json(), function(req, res, next) {
    let _id = req.params._id;
    LogsModel.updateOne({ _id }, { isActive: false }).then(result => {
      return res.send(result);
    });
  });
  
    




module.exports = router;
