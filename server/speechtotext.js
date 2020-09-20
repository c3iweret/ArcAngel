var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const $ = require("jquery");

const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

var firebase = require('firebase');

var ip = 0;

var config = {
  apiKey: "Api key",
  authDomain: "Api domain",
  databaseURL: "Database Url",
  projectId: "Project ID",
  storageBucket: "",
  messagingSenderId: "Msg ID"
};

firebase.initializeApp(config);

firebase.auth().signInWithEmailAndPassword("email@gmail.com", "projectred").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

module.exports = function(app){

  app.get('/startspeech', function(req, res){
    // Creates a client
    const client = new speech.SpeechClient();

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    const encoding = 'LINEAR16';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';

    const request = {
      singleUtterance: true,
      config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
      },
      interimResults: false, // If you want interim results, set this to true
    };



    // Create a recognize stream
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', function(data){
        process.stdout.write(
          data.results[0] && data.results[0].alternatives[0]
            ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
            : `\n\nReached transcription time limit, press Ctrl+C\n`
        );
        require("jsdom").env("", function(err, window) {

          if (err) {
              console.error(err);
              return;
          }
          var $ = require("jquery")(window);
          $.getJSON("http://api.ipify.org/?format=json", function(e) {
            ip = e.ip.toString().replace(/\./g, "");

          //  var datetime = new Date(Date.now()).toLocaleString().replace(/\//g, "-");
            res.send(data.results[0].alternatives[0].transcript);
            var datetime = Date.now();
            firebase.database().ref('Logins/' + ip + "/Logs/" + datetime).set({
              Message: data.results[0].alternatives[0].transcript,
              AI: 0,
              S: 1
            });
            record.stop();
          });
        });
      }
      );

      setTimeout(function () {
        record.stop();
        var datetime = Date.now();
        firebase.database().ref('Logins/' + ip + "/Logs/" + datetime).set({
          Message: '',
          AI: 0,
          S: 0
        });
      }, 5000)





    // Start recording and send the microphone input to the Speech API
    record
      .start({
        sampleRateHertz: sampleRateHertz,
        threshold: 0.1,
        // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
        verbose: false,
        recordProgram: 'rec', // Try also "arecord" or "sox"
        silence: '1.0',
      })
      .on('error', console.error)
      .pipe(recognizeStream);

    console.log('Listening, press Ctrl+C to stop.');

  });
}
