var express = require('express');
var router = express.Router();

var usersRouter = require('./users/users');
var accountsRouter = require('./accounts/accounts');
var contractsRouter = require('./contracts/contracts');
var transfersRouter = require('./transfers/transfers');
var transactionsRouter = require('./transactions/transactions');
const { generateKeyPair } = require('crypto');

var cors = require('cors');
router.use(cors());

router.use('/accounts', accountsRouter);
router.use('/users', usersRouter);
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
    
  

module.exports = router;
