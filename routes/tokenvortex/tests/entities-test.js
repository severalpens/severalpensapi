process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let EntitiesModel = require('../models/entities');

let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let server  = require('../../../bin/www')

chai.use(chaiHttp);

describe('Entities', () => {
    beforeEach((done) => {
        EntitiesModel.remove({}, (err) => {
           done();
        });
    });
  describe('/GET entities', () => {
      it('it should GET all the entities', (done) => {
            chai.request(server)
            .get('/entities')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST entity', () => {
      it('it should not POST a entity without pages field', (done) => {
          let entity = {
              name: "The Lord of the Rings",
              body: {},
              user_id: 'user_id'
          }
            chai.request(server)
            .post('/entities')
            .send(entity)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('pages');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a entity ', (done) => {
          let entity = {
              title: "The Lord of the Rings",
              author: "J.R.R. Tolkien",
              year: 1954,
              pages: 1170
          }
            chai.request(server)
            .post('/entities')
            .send(entity)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('EntitiesModel successfully added!');
                  res.body.entity.should.have.property('title');
                  res.body.entity.should.have.property('author');
                  res.body.entity.should.have.property('pages');
                  res.body.entity.should.have.property('year');
              done();
            });
      });
  });
  describe('/GET/:id entity', () => {
      it('it should GET a entity by the given id', (done) => {
          let entity = new EntitiesModel({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
          entity.save((err, entity) => {
              chai.request(server)
            .get('/entity/' + entity.id)
            .send(entity)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('title');
                  res.body.should.have.property('author');
                  res.body.should.have.property('pages');
                  res.body.should.have.property('year');
                  res.body.should.have.property('_id').eql(entity.id);
              done();
            });
          });

      });
  });
  describe('/PUT/:id entity', () => {
      it('it should UPDATE a entity given the id', (done) => {
          let entity = new EntitiesModel({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
          entity.save((err, entity) => {
                chai.request(server)
                .put('/entity/' + entity.id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('EntitiesModel updated!');
                      res.body.entity.should.have.property('year').eql(1950);
                  done();
                });
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id entity', () => {
      it('it should DELETE a entity given the id', (done) => {
          let entity = new EntitiesModel({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
          entity.save((err, entity) => {
                chai.request(server)
                .delete('/entity/' + entity.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('EntitiesModel successfully deleted!');
                      res.body.result.should.have.property('ok').eql(1);
                      res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });
});