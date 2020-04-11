var express = require('express');
var router = express.Router();

var accountsRouter = require('./accounts/accounts');//NB: this is the file path not the route
var contractsRouter = require('./contracts/contracts');
var transactionsRouter = require('./transactions/transactions');


router.use('/accounts', accountsRouter);
router.use('/contracts', contractsRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;
