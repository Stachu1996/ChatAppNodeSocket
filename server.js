'use strict';
//REQUIREMENTS
const express = require('express');
const app = express();
const chatApp = require('./app');

//CONFIG
app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));

//ROUTES
app.use('/', chatApp.router);

//SERVER
app.listen(app.get('port'), () => {
   console.log('ChatApp Running on Port: ', app.get('port'));
});

console.log( process.cwd() );