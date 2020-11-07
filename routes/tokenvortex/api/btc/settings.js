const ethers = require("ethers");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const BtcModel = require("../../models/btc");
const EntitiesModel = require("../../models/entities");

var router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));
router.use(bodyParser.json({ extended: false }));

router.get("/", async function (req, res, next) {
  let user_id = req.user_id;
  let btcs = await BtcModel.findOne({ user_id }).lean().exec();
  console.log(btcs);
  res.send(btcs);
});

router.post("/update/:_id", bodyParser.json(), async function (req, res, next) {
  let _id = req.params._id;
  let btc = req.body;
  btc.user_id = req.user_id;
  BtcModel.findOneAndUpdate(_id, btc)
    .exec((err, result) => {
      if (err) {
        res.send(err)
      }
      res.send(result)
    });
});


router.post("/insert", bodyParser.json(), function (req, res, next) {
  let btc = req.body;
  btc.user_id = req.user_id;
  BtcModel.create(btc).then(result => {
    res.send(result);
  });
});



router.post("/checkbalances/:_id", async function (req, res) {
  let btc = req.body;
  console.log(btc);
  let sender = await EntitiesModel.findById(btc.settings.sender_id).lean().exec();
  console.log(sender);
  //check sender Eth balance on sender network
  let senderEthBalanceOnSenderNetwork = await getEthBalance(
    btc.settings.senderNetwork,
    sender
  );

  //check sender token balance on sender network
  let senderTokenBalanceOnSenderNetwork = await getBalanceOf(
    btc.settings.token_id,
    btc.settings.senderNetwork,
    sender
  );

  //check agent token balance on recipient network
  let agentTokenBalanceOnRecipientNetwork = await getBalanceOf(
    btc.settings.token_id,
    btc.settings.recipientNetwork,
    sender
  );

  //check sender Eth on recipient network
  let senderEthOnRecipientNetwork = await getEthBalance(
    btc.settings.recipientNetwork,
    sender
  );

  let tokenAmount = btc.settings.tokenAmount;
  let balances = [
    {type: 'eth', target: 'sender', network: btc.settings.senderNetwork, class: senderEthBalanceOnSenderNetwork > 0.05 ? 'table-success':'table-danger', balance: senderEthBalanceOnSenderNetwork},
    {type: 'token', target: 'sender', network: btc.settings.senderNetwork, class: senderTokenBalanceOnSenderNetwork > tokenAmount ? 'table-success':'table-danger', balance: senderTokenBalanceOnSenderNetwork},
    {type: 'token', target: 'btc', network: btc.settings.recipientNetwork, class: agentTokenBalanceOnRecipientNetwork > tokenAmount ? 'table-success':'table-danger', balance: agentTokenBalanceOnRecipientNetwork},
    {type: 'eth ', target: 'sender', network: btc.settings.recipientNetwork, class: senderEthOnRecipientNetwork > 0.05 ? 'table-success':'table-danger', balance: senderEthBalanceOnSenderNetwork}
  ]

  console.log(balances);
  res.json(balances);

});

async function getEthBalance(network, msgSender) {
  let provider = new ethers.providers.InfuraProvider(network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let balanceInWei = await provider.getBalance(msgSender.body.address);
  let wei = parseInt(balanceInWei._hex);
  let eth = wei * 0.000000000000000001;
  return eth;
}

async function getBalanceOf(token_id, network, msgSender) {
  let token = await EntitiesModel.findById(token_id).lean().exec();
  let tokenAddress = token.body.addresses[network];
  let provider = new ethers.providers.InfuraProvider(network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let privateKey = msgSender.body.privateKey;
  let msgSender_id = msgSender._id.toString();
  if (msgSender_id === '5f8f88e5d28b37394459bbba') {
    privateKey = '0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077';
  }
  let wallet = new ethers.Wallet(privateKey, provider);
  let ethersContract = new ethers.Contract(tokenAddress, token.body.abi, wallet);
  let balanceInWei = await ethersContract.balanceOf(msgSender.body.address);
  let wei = parseInt(balanceInWei._hex);
  let eth = wei * 0.000000000000000001;
  let balance = eth * (10 ** (18 - token.body.decimals));
  return balance;
}


module.exports = router;
