var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());



router.get('/', function(req, res, next) {
  res.send('btc')
});


module.exports = router;
