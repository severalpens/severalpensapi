const express = require("express");
const router = express.Router();
const cors = require('cors');
const bodyParser = require("body-parser");

router.use(cors());
router.use(cors());
router.use(bodyParser.json());
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));
const LogsModel = require("../models/mongodb/logs");


router.get("/:seq_id",  function(req, res, next) {
  let seq_id = req.params.seq_id;
  const query = LogsModel.find({seq_id}); 
 // query.or([{ user_id: 'public' }, { user_id: req.user_id }])
  query.exec((err, logs) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(logs);
      }
    });
});

router.post("/delete/:_id", bodyParser.json(), function(req, res, next) {
  let _id = req.params._id;
  LogsModel.deleteOne({_id}).exec((result) => {
    res.send(result);
  })
});

  


module.exports = router;
