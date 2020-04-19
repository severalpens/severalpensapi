var express = require('express');
var router = express.Router();

var usersRouter = require('./users/users');
var accountsRouter = require('./accounts/accounts');
var contractsRouter = require('./contracts/contracts');
var transfersRouter = require('./transfers/transfers');
var transactionsRouter = require('./transactions/transactions');

var cors = require('cors');
router.use(cors());

router.use('/accounts', accountsRouter);
router.use('/users', usersRouter);
router.use('/contracts', contractsRouter);
router.use('/transfers', transfersRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;
