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
  let contract = await EntitiesModel.findById(transfer.contract_id).lean().exec();
  let contractAddress = contract.body.addresses[transfer.network]
  console.log('transfer.network', transfer.network === 'rinkeby');
  let provider = new ethers.providers.InfuraProvider(transfer.network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
  console.log('privateKey should be 0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077');
  console.log('privateKey is',transfer.msgSender.body.privateKey);
  console.log('transfer.msgSender.body.privateKey',transfer.msgSender.body.privateKey === '0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077');

  let wallet = new ethers.Wallet(transfer.msgSender.body.privateKey, provider);
  console.log('contractAddress', contractAddress === '0xfD6f44b58e93f2ef192c5Fe4dad265B8aF86e38C');
  let abi = require('../../tests/abi.json');
  console.log('contract.body.abi', contract.body.abi === abi);

  let ethersContract = new ethers.Contract(contractAddress, contract.body.abi, wallet);
  delete contract.body.abi;
  // ethersContract.transfer(transfer.recipient.body.address,transfer.amount,{ gasLimit: 7000000, gasPrice: ethers.utils.parseUnits('1.5', 'gwei'),});
  console.log('transfer.recipient.address',transfer.recipient.address === '0xd627a8B6dbEA4C24a2a4D34E367C27E8019533BA');
  ethersContract.transfer(transfer.recipient.address,1)
    .then(async (tx) => {
        tx.wait()
          .then(async (tx2) => {
            res.send({tx2});
          })
          .catch(async (error) => {
            res.send({error,transfer,contract,contractAddress});
          })
    })
    .catch(async (error) => {
      res.send({error,transfer,contract,contractAddress});
    })
});



module.exports = router;
