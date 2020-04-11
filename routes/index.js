var express = require('express');
var router = express.Router();

var tokenvortexRouter = require("./tokenvortex/tokenvortex");


router.use('/tokenvortex',tokenvortexRouter);








router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
