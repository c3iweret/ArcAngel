var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');

var app = express();

//define controllers
var conversation = require('./conversationserver');
var speechtotext = require('./speechtotext');

app.use(express.static('./public'));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

conversation(app);
speechtotext(app);


app.listen(3002, () => console.log("Listening on 3002"));
