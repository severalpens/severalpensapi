var express = require('express');
var router = express.Router();

var accountsRouter = require('./accounts/accounts');//NB: this is the file path not the route
var contractsRouter = require('./contracts/contracts');
var transactionsRouter = require('./transactions/transactions');


app.use('/accounts', accountsRouter);
app.use('/contracts', contractsRouter);
app.use('/transactions', transactionsRouter);

module.exports = router;
