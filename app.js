const express = require('express');
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser')

var test = require('./controllers/test')
var authTest = require('./controllers/authtestcontroller')
var user = require('./controllers/usercontroller')

app.use(bodyParser.json())
sequelize.sync();
app.use(require('./middleware/headers'));

app.use('/test', test)
app.use('/user', user)
app.use(require('./middleware/validate-session'));
app.use('/authtest', authTest);
app.listen(3000, function(){
    console.log('hey man')
})

