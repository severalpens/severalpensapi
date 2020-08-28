var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

var tokenvortexRouter = require("./tokenvortex/tokenvortex");
var parklandsRouter = require('./parklands/parklands');

router.use('/tokenvortex',tokenvortexRouter);
router.use('/parklands',parklandsRouter);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
