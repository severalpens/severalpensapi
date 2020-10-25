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
  let contract = await getContract(req.body.contract_id, req.user_id);
  let addressSource = {}
  let address = '';
  if (x.type === 'contract') {
    addressSource = await getContract(req.body.balanceQuery._id, req.user_id);
    address = addressSource.addresses[req.body.network];
  }

  if (x.type === 'account') {
    addressSource = await  getAccount(req.body.balanceQuery._id, req.user_id);
    address = addressSource.address;
  }

  let provider = new ethers.providers.InfuraProvider(req.body.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  let wallet = new ethers.Wallet('0xa2e19e3c8580f31b13ad31fa1638a503bfc6771be57eb1952b3f9416ad07194a', provider);
  let ethersContract = new ethers.Contract(contract.addresses[req.body.network], contract.abi, wallet);
  let balance = await ethersContract.balanceOf(address);
  res.send(balance);


});

async function getContract(_id, user_id) {
  const contractsQuery = EntitiesModel.findById(_id);
  contractsQuery.setOptions({ lean: true });
  contractsQuery.collection(EntitiesModel.collection);
  contractsQuery.or([{ user_id: 'public' }, { user_id }]);
  contractsQuery.where('isActive').equals(true);
  return await contractsQuery.exec();
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
