const crypto = require('crypto');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var cors = require('cors');
router.use(cors());
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb',extended: false}));
router.use(bodyParser.json({extended: false}));

router.use(cors());
var schedulesRouter = require('./schedules/schedules');

router.use('/schedules', schedulesRouter);




module.exports = router;
