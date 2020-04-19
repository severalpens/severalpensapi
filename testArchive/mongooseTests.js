"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const ContractsModel = require('../routes/tokenvortex/models/mongodb/contracts')
describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    const usr = process.env.usr;
    const password = process.env.password;
    const url = process.env.url;
    const connectionString = `mongodb+srv://${usr}:${password}@${url}/token_vortex?retryWrites=true&w=majority`;
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });
  describe('Test Database', function() {
    //Save object with 'name' value of 'Mike"
    it('Should retrieve data from test database', function(done) {
      //Look up the 'Mike' object previously saved.
    ContractsModel.find({}).select('name').exec((err,result) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
    })  
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});