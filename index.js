const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('The Server listen on port 3000.');
});

app.get('/', function (req, res) {
    res.send('Hello world!');
});

const APP_TOKEN = '';

app.get('/webhook', function(req, res) {
    if(req.query['hub.verify_token'] === '') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Welcome to nothingness.');
    }
});
