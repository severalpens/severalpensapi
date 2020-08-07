var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var TxbdsModel = require('../models/mongodb/txbds');



router.post("/:_id", bodyParser.json(), function(req, res, next) {
  try {
  let _id = req.params._id;
  if (_id) {
    TxbdsModel.updateOne(
      { _id},
      req.body,
      function(err, result) {
        res.send(result);
      });
  }
} catch (error) {
  res.status(404).send(error);
}
});





module.exports = router;