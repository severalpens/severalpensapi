var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());
var accountsRouter = require('./accounts/accounts');
var contractsRouter = require('./contracts/contracts');

var transfersRouter = require('./transfers/transfers');
var transactionsRouter = require('./transactions/transactions');

var transfersV1Router = require('./transfersv1/transfersv1');
var transactionsV1Router = require('./transactionsv1/transactionsv1');

var transfersV2Router = require('./transfersv2/transfersv2');
var transactionsV2Router = require('./transactionsv2/transactionsv2');

const { generateKeyPair } = require('crypto');



router.use('/accounts', accountsRouter);
router.use('/contracts', contractsRouter);
router.use('/transfers', transfersRouter);
router.use('/transactions', transactionsRouter);
router.use('/transfersv1', transfersV1Router);
router.use('/transactionsv1', transactionsV1Router);
router.use('/transfersv2', transfersV2Router);
router.use('/transactionsv2', transactionsV2Router);


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
    
  

module.exports = router;
