const ethers = require("ethers");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const EntitiesModel = require("../../models/entities");
const settings = require('./utils/settings.json')
const sequenceRunner = require('./sequenceRunner');
var router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));
router.use(bodyParser.json({ extended: false }));


router.post("/run", async function (req, res) {
  let btc = req.body;
  btc.user_id = req.user_id;

  sequenceRunner.run(btc);
});



module.exports = router;
