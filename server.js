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

app.get('/test', (req, res, next) => {
    //res.send('<h1>Hello Express!</h1>');
    //res.sendFile(__dirname + '/views/login.htm');
    res.render('login', {
        pageTitle: 'My Login Page'
    });
});

//SERVER
app.listen(app.get('port'), () => {
   console.log('ChatApp Running on Port: ', app.get('port'));
});