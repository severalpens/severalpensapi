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

var SequencesModel = require('../models/mongodb/sequences');


router.get("/",  function(req, res, next) {
  const query = SequencesModel.find(); 
  query.setOptions({ lean : true });
  query.collection(SequencesModel.collection)
  query.or([{ user_id: 'public' }, { user_id: req.user_id }])
  query.where('isActive').equals(true)
  query.exec((err, sequences) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(sequences);
      }
    });
});


router.get("/:_id",  function(req, res, next) {
  const query = SequencesModel.findById(req.params._id); 
  query.where({ user_id: req.user_id })
  query.where('isActive').equals(true)
  query.exec((err, sequences) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(sequences);
      }
    });
});


module.exports = router;
