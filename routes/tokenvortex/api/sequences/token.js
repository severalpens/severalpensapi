const ethers = require("ethers");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const EntitiesModel = require("../../models/entities");

var router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: false }));
router.use(bodyParser.json({ extended: false }));


router.post("/balance", async function (req, res) {
  let tokenBalanceQuery = req.body;
  let contract = await EntitiesModel.findById(tokenBalanceQuery.contract_id).lean().exec();
  let provider = new ethers.providers.InfuraProvider(tokenBalanceQuery.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let wallet = new ethers.Wallet('0xa2e19e3c8580f31b13ad31fa1638a503bfc6771be57eb1952b3f9416ad07194a', provider);
  let ethersContract = new ethers.Contract(contract.body.addresses[tokenBalanceQuery.network], contract.body.abi, wallet);
  let balanceInWei = await ethersContract.balanceOf(tokenBalanceQuery.address);
  let wei = parseInt(balanceInWei._hex);
  let eth = wei * 0.000000000000000001;
  let balance = eth *  (10**(18-contract.body.decimals));
  res.json(balance);
});

async function getContract(_id, user_id) {
 let result =  EntitiesModel.findOne({_id,user_id}).lean().exec();
 return result;
}


async function getAccount(_id, user_id) {
  const accountsQuery = EntitiesModel.findById(_id);
  accountsQuery.setOptions({ lean: true });
  accountsQuery.collection(EntitiesModel.collection);
  accountsQuery.or([{ user_id: 'public' }, { user_id }]);
  accountsQuery.where('isActive').equals(true);
  return await accountsQuery.exec();
}



router.post("/transfer", async function (req, res) {
  let transfer = req.body;
  let provider = new ethers.providers.InfuraProvider(transfer.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let wallet = new ethers.Wallet(transfer.sender.body.privateKey, provider);
  let amount = ethers.utils.parseUnits(transfer.amount.toString(),transfer.denomination.unit);
  
  let tx = {
      to: transfer.recipient.body.address,
      value: amount
  };
  
  let sendPromise = wallet.sendTransaction(tx);
  
  sendPromise.then((tx) => {
      console.log(tx);
      res.send(tx);
  });
});



module.exports = router;
