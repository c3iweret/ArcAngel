import React from 'react'
import './Conversation.css'
import allSymptoms from '../../resources/symptoms.js'
import Profile from '../Profile/Profile'
import $ from 'jquery';
import firebase from '../firebase'

var symptomMap = null;
var userSymptoms = [];
var totalDiagnosis=[];
var diagnosisMap = null;
var wordSymptoms = [];
var firstDiagnosis;
var secondDiagnosis;

var globalHistory;
var firstRun = true;

function press(input, speeched) {
  //var datetime = new Date(Date.now()).toLocaleString().replace(/\//g, "-");
  var datetime = Date.now();
  if(!speeched) {
    firebase.database().ref('Logins/' + thisRef.state.IP + "/Logs/"  + datetime.toString()).set({
      Message: input,
      AI: 0,
      S: 0
    });
  }
  userSymptoms = [];
   wordSymptoms = [];
  var parsedInput = input.split('and');
  for(var i in parsedInput){
    input = parsedInput[i];
    fetch('http://localhost:3002/api/message?message=' + input, {
      method: 'POST'
    })
      .then(function(response) {
        response.json().then(function(data) {
          console.log("DATA OUTPUT TEXT: " + data.output.text);

          var symptom= data.output.text[0];
          symptom = symptom.charAt(0).toUpperCase() + symptom.substring(1);


          //console.log(parseInt(symptomMap.get(symptom)))
          if(symptomMap.get(symptom) == null ){
            userSymptoms.push(-1);
          }else{
            wordSymptoms.push(symptom);
            userSymptoms.push(parseInt(symptomMap.get(symptom)));
          }
          if(userSymptoms.length == parsedInput.length){
            removeUnkownSymptoms();
            getAPIMedic();
          }
        })
      })
  }

}

function updateFB(sym) {
  //var datetime = new Date(Date.now()).toLocaleString().replace(/\//g, "-");
  var datetime = Date.now();
  firebase.database().ref('Logins/' + thisRef.state.IP + "/Logs/" + datetime.toString()).set({
    Message: sym,
    AI: 1,
    S: 0
  });
}

function removeUnkownSymptoms(){
for(var i in userSymptoms){
  if(userSymptoms[i]==-1){
    userSymptoms.splice(i,1);
  }
}
}

function combination (arr) {

  let i, j, temp
  let result = []
  let arrLen = arr.length
  let power = Math.pow
  let combinations = power(2, arrLen)

  // Time & Space Complexity O (n * 2^n)

  for (i = 0; i < combinations;  i++) {
    temp = []

    for (j = 0; j < arrLen; j++) {
      // & is bitwise AND
      if ((i & power(2, j))) {
        temp.push(arr[j])
      }
    }
    result.push(temp)
  }
  return result;
}
function formSymptomsMessage(){
  console.log(wordSymptoms)
  if(wordSymptoms != null && wordSymptoms.length != 0) {
  var res='These are the symptoms that I recognized:\n';
  for(var i in wordSymptoms){
    res += parseInt(i)+1+'. '+wordSymptoms[i]+'\n';
  }
  res+='If these symptoms are wrong, try rephrasing.'

    return res;
  } else {
    return "No symptoms were recognized, please rephrase and try again."
  }
}
function formDiagnosisMessage(){
  var str = 'My first diagnosis is that you have '+ firstDiagnosis + '. There are also signs of ' + secondDiagnosis+'.';
  return str;
}

function getAPIMedic() {
  totalDiagnosis=[];
  var symptoms = combination(userSymptoms);
  var count = 1;
  console.log(symptoms)
  if(symptoms == null ||symptoms.length==1){
    updateFB(formSymptomsMessage());
  }else{

  //console.log(symptoms)
  for(var i=1;i<symptoms.length;i++){
    var symptom = symptoms[i];
    //console.log('fetching')
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFzc2VlbEBteS55b3JrdS5jYSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMzEwMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0wMy0yOCIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTI3NDIxNDQxLCJuYmYiOjE1Mjc0MTQyNDF9.kA3_hRA4e-7mM54cf7GhgJZ5Zpt52hen9HD5rUnFKcA'
    var gender = "male";
    var year_of_birth = 1996;


    fetch('https://sandbox-healthservice.priaid.ch/diagnosis?token=' + token + '&symptoms=' + JSON.stringify(symptom) + '&gender='+gender + '&year_of_birth='+year_of_birth + '&language=en-gb', {
      method: 'GET'
    })
      .then(function(response) {
        response.json().then(function(data) {
          count+=1;
        //  console.log(data);
          totalDiagnosis.push(data);
            //console.log('complete')
          //  console.log(totalDiagnosis)
            if(count == symptoms.length){
              findDiagnosis();
            }

        })
      })
  }
}

}

function findDiagnosis(){
  diagnosisMap = new Map();
//  console.log("diag: "+totalDiagnosis);
  var max = 0, maxD='', second = 0, secondD='';
  for(var i in totalDiagnosis){
    if(totalDiagnosis[i].length != 0){
      for(var j  = totalDiagnosis[i].length-1; j>=0;j--){
        if(totalDiagnosis[i][j].length !=0){
          var name = totalDiagnosis[i][j].Issue.Name+" ("+totalDiagnosis[i][j].Issue.ProfName+")";
          var accuracy = totalDiagnosis[i][j].Issue.Accuracy;
          var total = 0;
          if(diagnosisMap.get(name)!=null){
            total = diagnosisMap.get(name);
          }
          total += accuracy;
          if(total>=max&&maxD!=name){
            second = max;
            secondD = maxD;
            max = total;
            maxD = name;
          }
          diagnosisMap.set(name,total);
        }
      }
    }
  }
  console.log("1: "+maxD+" "+max)
  console.log("2: "+secondD+" "+second)
  firstDiagnosis = maxD;
  secondDiagnosis = secondD;

  updateFB(formSymptomsMessage());
  if((firstDiagnosis != null && firstDiagnosis != "") || (secondDiagnosis != null && secondDiagnosis != "")) {
    updateFB(formDiagnosisMessage());
  }
}
function allSymptomsToMap(){
  symptomMap = new Map();
  for(var s in allSymptoms){
    symptomMap.set(allSymptoms[s].Name, allSymptoms[s].ID);
    symptomMap.set(allSymptoms[s].ID,allSymptoms[s].Name);
  }
}


var thisRef;

class Conversation extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        input: '',
        IP: 0,
        visibleMessage: false,
        currentConvo: [],
        listening: false
      };
      this.handleMessage = this.handleMessage.bind(this);
      this.updateInput = this.updateInput.bind(this);
      this.toggleVisibleMessage = this.toggleVisibleMessage.bind(this);
      this.startRecording = this.startRecording.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      thisRef = this;
      //console.log(allSymptoms);
      allSymptomsToMap();



    }

    componentDidMount() {
      $.getJSON("http://api.ipify.org/?format=json", function(e) {
        thisRef.setState({
          IP: e.ip.toString().replace(/\./g, "")
        })
        var dbRef = firebase.database().ref('Logins/' + thisRef.state.IP + "/Logs/");
          dbRef.on('value', function(snapshot) {
            thisRef.setState({
              currentConvo: Object.values(snapshot.val()),
              listening: false
            })
            globalHistory = snapshot.val();

            if(Object.values(snapshot.val())[Object.values(snapshot.val()).length-1].S == 1) {
              press(Object.values(snapshot.val())[Object.values(snapshot.val()).length-1].Message, true);
            }
            //thisRef.render();

            //  console.log("This is the latest message: " + Object.values(msgArray)[Object.values(msgArray).length-1].Message);
            /*var msgArray = snapshot.val();
            console.log(Object.keys(msgArray));

            var datetimeBefore = Date.now() - 30000;
            console.log(new Date(datetimeBefore).toLocaleString());
            console.log(Object.keys(msgArray)[Object.keys(msgArray).length-1]);
            if(Object.keys(msgArray)[msgArray.length-1] > new Date(datetimeBefore).toLocaleString()) {
              console.log("This is the message:");
              console.log(Object.values(msgArray)[msgArray-1]);
            }*/
          });
      });

    }

    toggleVisibleMessage()  {

      this.setState({
        visibleMessage: !this.state.visibleMessage
      })
    }

    componentDidUpdate() {

    }

    startRecording(){
      this.setState({
        listening: true
      })
      fetch('http://localhost:3002/startspeech', {
        method: 'GET'
      })
        .then(function(response) {
          //console.log(response);
          /*firebase.database().ref('Logins/' + thisRef.state.IP).once('value', function(snap) {
            initialDataLoaded = true;
          });*/
          console.log(response);
        })
    }

    handleMessage() {
      console.log(this.state.input);
      press(this.state.input, false);
    //  getAPIMedic();
    }


    updateInput(e) {
      this.setState({input: e.target.value});
    }

    handleKeyPress = (e) => {
      if(e.key == 'Enter') {
        this.setState({input: e.target.value});
        press(this.state.input, false);
      }
    }

    /*  <Profile IP={this.state.IP} />
    <p className="Conversation-Bubble-Text">EIGJAEOIGHEIGJAEOIGHOIAEHGOAIEOIAEHGOAIEEIGJAEOIGHOIAEHGOAIEEIGJAEOIGHOIAEHGOAIEEIGJAEOIGHOIAEHGOAIEEIGJAEOIGHOIAEHGOAIEEIGJAEOIGHOIAEHGOAIE</p>
    <p className="Conversation-Bubble-TextAI">EIGJAEOIGHEIGJAEOIGHOIAEHGOAIEOIAEHGOAIEEIGJAEOIGHOIAEHGOAIEEIGJAEOIGHOIAEHGOAIEEIGJAEOIGHOIAEHGOAIEEIGJAEOIGHOIAEHGOAIEEIGJAEOIGHOIAEHGOAIE</p>
    */


    render() {
      return(
        <div className="Conversation-Background">
          <div className="Conversation-Container">
            <div className="Conversation-View">
            {
              this.state.currentConvo.map((index, i) => {
                if(this.state.currentConvo[i] != null && this.state.currentConvo[i].Message != "") {
                if(this.state.currentConvo[i].AI == 0) {
                return(
                  <div key={i}>
                  <p className="Conversation-Bubble-Text">{this.state.currentConvo[i].Message}</p>
                  <div className="clear"/>
                  </div>
                )
              } else {
                return(
                <div key={i}>
                <p className="Conversation-Bubble-TextAI">{this.state.currentConvo[i].Message}</p>
                <div className="clear"/>
                </div>
                )
              }
              }
              })
            }

            </div>
            <div id="messageForm" type="text" className="Conversation-MessageForm">
                <input type="text"  onKeyPress={this.handleKeyPress}  name="name" className={this.state.visibleMessage ? "Conversation-MessageForm-Input" : "Conversation-MessageForm-Hidden"} onChange={this.updateInput} />
                <button type="button" onClick={this.handleMessage} className={this.state.visibleMessage ? "Conversation-MessageForm-InputButton btn btn-primary" : "Conversation-MessageForm-InputButton-Hidden"}>Enter</button>
            </div>
            <div className="Conversation-MessageIcon-Container">
            <button className="Conversation-MessageIcon-Holder" onClick={this.toggleVisibleMessage}>
            <img src="/images/message2.png" className="Conversation-MessageIcon"/>
            </button>
            <button className={this.state.listening ? "Conversation-MessageIcon-Holder-Green" : "Conversation-MessageIcon-Holder"} onClick={this.startRecording}>
            <img src="/images/microphone.png" className="Conversation-MessageIcon"/>
            </button>
            </div>
          </div>
        </div>
      )
    }
}


export default Conversation;
