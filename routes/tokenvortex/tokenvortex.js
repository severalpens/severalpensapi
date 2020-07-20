const crypto = require('crypto');
var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());
var accountsRouter = require('./accounts/accounts');
var contractsRouter = require('./contracts/contracts');

var transfersRouter = require('./transfers/transfers');
var transactionsRouter = require('./transactions/transactions');



const { generateKeyPair } = require('crypto');



router.use('/accounts', accountsRouter);
router.use('/contracts', contractsRouter);
router.use('/transfers', transfersRouter);
router.use('/transactions', transactionsRouter);


router.get('/generatekeypair/:_id', function(req, res) {
    let tmpPassphrase = req.params._id || '';
    generateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: tmpPassphrase
      }
    }, (err, public, private) => {
        let privateKey = private.split('-----')[2];
        let publicKey = public.split('-----')[2];
        let result = {privateKey,publicKey};
        console.log(result);
        res.send(result);
    });
  });
    
  
router.get('/newSecretHashPair/', function(req, res) {
    let hashPair = newSecretHashPair();
     return  res.json(hashPair);
  });
  
const bufToStr = b => '0x' + b.toString('hex')

const sha256 = x =>
  crypto
    .createHash('sha256')
    .update(x)
    .digest()

const random32 = () => crypto.randomBytes(32)

const isSha256Hash = hashStr => /^0x[0-9a-f]{64}$/i.test(hashStr)

const newSecretHashPair = () => {
  const secret = random32()
  const hash = sha256(secret)
  return {
    secret: bufToStr(secret),
    hash: bufToStr(hash),
  }
}


module.exports = router;
