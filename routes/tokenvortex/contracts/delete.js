var express = require("express");
var router = express.Router();
var cors = require('cors');
router.use(cors());
var bodyParser = require("body-parser");
var ContractsModel = require('../models/mongodb/contracts');





router.post("/:_id", bodyParser.json(),async  function(req, res, next) {
    let _id = req.params._id;
    // ContractsModel.updateOne({ _id }, { isActive: false }).then(result => {
    //   return res.send(result);
    // });

    let result =  await ContractsModel.findByIdAndDelete(_id).exec();
    return res.send(result);
    
  });
  
    




module.exports = router;
