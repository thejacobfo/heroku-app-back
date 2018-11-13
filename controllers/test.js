var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');


// router.get('/', function (req, res) {
//     res.send('Hey!!! This is a test route!')
// });
// router.get('/about', function (req, res) {
//   res.send('This is an about route');
// });
// //1 Pass in an object
// router.get('/contact', function (req, res) {
//     res.send({user: "kenn", email: "kenn@beastmode.com"});
// });
// //2 Pass in an array
// router.get('/projects', function (req, res) {
//     res.send(['Project 1', 'Project 2']);
// });
// //3 Pass in an array of objects
// router.get('/mycontacts', function (req, res) {
//   res.send([
//     {user: "quincy", email: "kenn@beastmode.com"},
//     {user: "aaron", email: "aaron@beastmode.com"},
//     {user: "quincy", email: "quincy@beastmode.com"},
//     {user: "tom", email: "tom@beastmode.com"}
//   ]);
// });
router.post('/one', function (req, res){
  res.send('big money')
});
router.post('/two', function (req, res) {
  let testData = "Test data for endpoint two";
  
  TestModel
    .create({
      testdata: testData
    }).then(dataFromDatabase => {
        res.send("Test two went through!")
    })
});
router.delete('/two/:id', function(req, res){
  let id = req.params.id
  TestModel.destroy({ where: {id: id}}).then(dataFromDatabase => {res.send("Deletion confirmed!")})
})
router.post('/three', function (req, res) {
  var testData = req.body.testdata.item; 
  TestModel
.create({
testdata: testData
})
res.send("Test three went through!")
console.log("Test three went through!")
});
router.delete('/three/:id', function(req, res){
  let id = req.params.id
  TestModel.destroy({ where: {id: id}}).then(dataFromDatabase => {res.send("Deletion confirmed!")})
})

router.post('/four', function (req, res) {
  var testData = req.body.testdata.item;
TestModel
    .create({
      testdata: testData
    })
    .then(
      function message() {
       res.send("Test 4 went through!");
      }
    );
});
router.delete('/four/:id', function(req, res){
  let id = req.params.id
  TestModel.destroy({ where: {id: id}}).then(dataFromDatabase => {res.send("Deletion confirmed!")})
})
router.get('/helloclient', function (req, res) {
  res.send('This is a message from the server to the client.')
  })
  router.get('/one', function(req, res) {
      TestModel
        .findAll({ //1
            attributes: ['id', 'testdata']
        })
        .then(
            function findAllSuccess(data) {
                console.log("Controller data:", data);
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
    });
module.exports = router;