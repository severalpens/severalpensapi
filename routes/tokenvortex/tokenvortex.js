var express = require('express');
var router = express.Router();

var accountsRouter = require('./accounts/accounts');//NB: this is the file path not the route
var contractsRouter = require('./contracts/contracts');
var queriesRouter = require('./queries/queries');
var transfersRouter = require('./transfers/transfers');
var transactionsRouter = require('./transactions/transactions');

var cors = require('cors');
router.use(cors());

router.use('/accounts', accountsRouter);
router.use('/contracts', contractsRouter);
router.use('/queries', queriesRouter);
router.use('/transfers', transfersRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;
