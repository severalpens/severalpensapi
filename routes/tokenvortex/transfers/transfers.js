var express = require("express");
var router = express.Router();
var insertRouter = require("./insert");
var deleteRouter = require("./delete");
var updateRouter = require("./update");

router.use('/insert',insertRouter);
router.use('/update',updateRouter);
router.use('/delete',deleteRouter);

var TransfersModel = require('../models/mongodb/transfers');


router.get("/",  function(req, res, next) {
  const query = TransfersModel.find(); 
  query.setOptions({ lean : true });
  query.collection(TransfersModel.collection)
  query.or([{ owner: 'public' }, { owner: req._id }])
  query.exec((err, transfers) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(transfers);
      }
    });
});




module.exports = router;
