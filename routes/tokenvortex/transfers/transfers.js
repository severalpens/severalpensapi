var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
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
  //query.or([{ user_id: 'public' }, { user_id: req.user_id }])
  query.exec((err, transfers) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(transfers);
      }
    });
});

router.get("/findone/:transfer_id",  function(req, res, next) {
  const query = TransfersModel.findById(req.params.transfer_id); 
  query.setOptions({ lean : true });
  query.collection(TransfersModel.collection)
  //query.or([{ user_id: 'public' }, { user_id: req.user_id }])
  query.exec((err, transfer) => {
      if (err != null) {
        return res.send(err);
      } 
      else {
        return res.send(transfer);
      }
    });
});




module.exports = router;
