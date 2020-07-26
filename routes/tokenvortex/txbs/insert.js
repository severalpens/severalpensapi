var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TxbsModel = require('../models/mongodb/txbs');



router.post("/", bodyParser.json(), async function(req, res, next) {
  try {
    delete req.body._id;
    let txbs = new TxbsModel(req.body);
      let result = await txbs.save();
      res.send(result);

  //   TxbsModel.create(req.body).then(result => {
  //     console.log(result);
  //     res.send(result);
  //   });
  } catch (error) {
    res.status(404).send(error);
  }

});

module.exports = router;
