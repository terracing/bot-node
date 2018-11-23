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

app.post('/webhook', function(req, res) {
    var data = req.body;
    if(data.object === 'page') {
        data.entry.forEach(function(pageEntry) {
            pageEntry.messaging.forEach(function(messagingEvent) {
                if(messagingEvent.message) {
                    receiveMessage(messagingEvent);
                }
            });
        });
        res.sendStatus(200);
    }
});

function receiveMessage(messaging) {
    var senderId = messaging.sender.id;
    var messageText = messaging.sender.text;

    console.log(senderId + ' - ' + messageText);
}
