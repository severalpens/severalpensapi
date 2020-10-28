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


router.post("/", async function (req, res) {
  let x = req.body.balanceQuery;
  let contract = await EntitiesModel.findById(req.body.contract_id).lean().exec();
  let addressSource = {};
  let address = '';
  addressSource = await EntitiesModel.findById(req.body.balanceQuery._id).lean().exec();
  address = x.type === 'contract' ? addressSource.body.addresses[req.body.network] : addressSource.body.address;
  let provider = new ethers.providers.InfuraProvider(req.body.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let wallet = new ethers.Wallet('0xa2e19e3c8580f31b13ad31fa1638a503bfc6771be57eb1952b3f9416ad07194a', provider);
  let ethersContract = new ethers.Contract(contract.body.addresses[req.body.network], contract.body.abi, wallet);
  let balance = await ethersContract.balanceOf(address);
  res.send(balance);
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



module.exports = router;
