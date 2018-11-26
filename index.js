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

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === '') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Welcome to nothingness.');
    }
});

app.post('/webhook', function (req, res) {
    var data = req.body;
    if (data.object === 'page') {
        data.entry.forEach(function (pageEntry) {
            pageEntry.messaging.forEach(function (messagingEvent) {
                if (messagingEvent.message) {
                    receiveMessage(messagingEvent);
                }
            });
        });
        res.sendStatus(200);
    }
});

function receiveMessage(messaging) {
    var senderId = messaging.sender.id;
    var messageText = messaging.message.text;

    evaluateMessage(senderId, messageText);
    console.log(senderId + ' - ' + messageText);
}

function evaluateMessage(recipientId, message) {
    var finalMessage = '';
    if(isContain(message, 'Hi!')) {
        finalMessage = 'Hi! How are you?';
        sendMessageText(recipientId, finalMessage);
    } else if(isContain(message, 'cat')) {
        sendMessageImage(recipientId);
    } else {
        finalMessage = message;
        sendMessageText(recipientId, finalMessage);
    }
    
}

function isContain(sentence, word) {
    return sentence.indexOf(word) > -1;
}

function sendMessageText(recipientId, message) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: message
        }
    }
    callSendAPI(messageData);
}

function sendMessageImage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: 'image',
                payload: {
                    url: 'https://i.imgur.com/4AiXzf8.jpg'
                }
            }
        }
    }
    callSendAPI(messageData);
}

function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.11/me/messages',
        qs: {
            access_token: APP_TOKEN
        },
        method: 'POST',
        json: messageData
    }, function(err, response, data) {
        if(err) {
            console.log(err);
        }
        // console.log(response);
    });
}
