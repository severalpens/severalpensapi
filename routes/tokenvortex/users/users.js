var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var UsersModel = require("../models/mongodb/users");
var bcrypt = require('bcrypt');
var cors = require('cors');
router.use(cors());


router.post("/", bodyParser.json(), function(req, res, next) {

UsersModel.find({},(err,result) => {
  res.send(result)
})
});

router.post("/register", bodyParser.json(), function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  UsersModel.count({username},(err,result) => {
    if(result != 0){
      return res.status(401).send(err)
     }
     let salt = bcrypt.genSaltSync();
     let hashedPassword = bcrypt.hashSync(password,salt);
     let tmp = new UsersModel();
     tmp.username = req.body.username;
     tmp.password = hashedPassword;
     tmp.save({},(err,saveResult) => {
       res.send('jwtToken')
     })
  })
});



router.post("/login", bodyParser.json(), function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  UsersModel.findOne({username},(err,user) => {
    if(err){res.status(401).send(err) }
    let validPassword = bcrypt.compareSync(user.password,password);
    if(validPassword){
      res.send(username)
    }
  })
});

  



module.exports = router;
