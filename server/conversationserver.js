var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var app = express();

/*app.use(express.static('./public'));
app.use(bodyParser.json());*/

module.exports = function(app){
  var assistant = new watson.AssistantV1({
    username: 'ENTER USER NAME HERE',
    password: 'ENTER PASSWORD HERE',
    version: watson.ConversationV1.VERSION_DATE_2017_05_26
  });

  app.post('/api/message', function(req, res) {
    var input = req.query.message;
    //Possibly parse input to something... don't know yet

    assistant.message({
      workspace_id: 'WORKSPACE',
      input: {'text': input}
    },  function(err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
        //res.send(JSON.stringify(response, null, 2));
        var a = "sup";
        res.json(response);
    });

  });
}
