require('dotenv').config()
var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

/*************************
** Create User Endpoint: Starter***
**************************/
//2
router.get('/', function(req, res){
    res.send('lol')
})
router.post('/signup', function (req, res) {

  var username = req.body.user.username
  var password = req.body.user.password
  User.create({
    username: username,
    passwordhash: bcrypt.hashSync(password, 10)

  }).then(
    function signupSuccess(user){
      var token = jwt.sign({id: user.id},process.env.JWT_SECRET, {expiresIn: 60*60*24})
    res.json({
      user: user,
      message: 'created',
      sessionToken: token
    })
    }, function (req, res){
      res.send(500, err.message)
    }
  );
})

router.post('/login', function(req, res) {
    console.log('hello')
User.findOne( { where: { username: req.body.user.username } } ).then(
      function(user) {
          if (user) {
              bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                  //1
                  if (matches) {
                      //2
                      var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                      res.json({  //3
                          user: user,
                          message: "successfully authenticated",
                          sessionToken: token
                      });
                  }else { //4
                      res.status(502).send({ error: "you failed, yo" });
                  }
              });
          } else {
              res.status(500).send({ error: "failed to authenticate" });
          }
      },
      function(err) {
          res.status(501).send({ error: "you failed, yo" });
      }
  );
});

router.put('/update', function(res, req){
    res.send("Updated!")
})
router.delete('/delete', function(req, res){
    res.send("deleted user!")
})
module.exports = router;