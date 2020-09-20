const express = require('express');
const app = express();
const fs = require('fs');
const $ = require("jquery");
var SerialPort = require('serialport');

var port = new SerialPort('/dev/cu.usbmodem1411', {
  baudRate: 250000
});

var firebase = require('firebase');

var config = {
  apiKey: "API KEY",
  authDomain: "Project Domain",
  databaseURL: "Database URL",
  projectId: "Project ID",
  storageBucket: "",
  messagingSenderId: "msg id"
};

//get the info above from firebase

firebase.initializeApp(config);

firebase.auth().signInWithEmailAndPassword("email@gmail.com", "projectred").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

function writeLoginData(UID1, Time, i, ip) {
  console.log("Firebase ip: " + ip);
  firebase.database().ref('Logins/' + ip + "/" + i).set({
    UID: UID1,
    Time: Time
  });
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

port.on('data', function (data) {
  var datetime = new Date(Date.now()).toLocaleString();
  //Need to convert HEX to ASCII... nvm toString does the trick
  var u = parseInt(data.toString()).toString();
  var t = datetime.toString();

  require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    var $ = require("jquery")(window);
    $.getJSON("http://api.ipify.org/?format=json", function(e) {
      var ip = e.ip.toString().replace(/\./g, "");
      //console.log(ip);
        if (data.toString().match(/^\d/)) {
          firebase.database().ref('/Logins/' + ip).once('value').then(function(snap) {
            var ind = (snap.val()) == null ? 0 : (Object.keys(snap.val()).length);
            if(u.length == 10) {
              writeLoginData(u, t, ind, ip);
            }
        });
      }
    });
  });


  //In case you need to write serial info to file
  /*fs.writeFile("../public/Login/Login.js", UIDJson, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("Sent file to public folder... No errors.");
  })

  });*/
});

app.get('/data', function(req, res) {

});

app.listen(3001, () => console.log("Listening on 3001"));
