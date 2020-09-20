import React from 'react'
import '../../css/animate.css'
import './Welcome.css'
import firebase from '../firebase'
import $ from 'jquery';

function animateFillBox(ref) {
  ref.setState({
    scanned: true
  });

  setTimeout(function() {
    //your code to be executed after 1 second
    console.log(ref.state.UID);
    ref.props.history.push("/Profiles/"+ref.state.UID + "/Overview", null)
  }, 700);
}

class Welcome extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      scanned: false,
      storageValue: 0,
      web3: null,
      UID: "",
      IP: ""
    }

    var thisRef = this;
    var initialDataLoaded = false;

    firebase.auth().signInWithEmailAndPassword("sidiqueafg@gmail.com", "projectred").catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
      // ...
    });

    $.getJSON("http://api.ipify.org/?format=json", function(e) {
      thisRef.setState({
        IP: e.ip.toString().replace(/\./g, "")
      });

      firebase.database().ref('Logins/' + thisRef.state.IP).on('value', function(snap) {
        if(initialDataLoaded) {
          var arr = (Object.values(snap.val()));
          var index = arr.length;
          thisRef.setState({
            UID: arr[index-3].UID,
            IP: thisRef.state.IP
          })
          animateFillBox(thisRef);
        }
      });
      firebase.database().ref('Logins/' + thisRef.state.IP).once('value', function(snap) {
        initialDataLoaded = true;
      });
    });
  }

  componentWillMount() {


  }

  componentWillUnmount() {
    firebase.database().ref('Logins/' + this.state.IP).off('value');
  }


  render() {
    return(
      <div className='background'>
        <div className="container center animated fadeInUp">
          <p className="title">ArcAngel</p>
          <img className="logo" src="/images/arkangel.png" alt="Coult not load"/>
        </div>
        <div className="overlay-container center">
          <div className={this.state.scanned ? "box" : "boxHidden"}></div>
        </div>
        <div className="container center animated fadeIn">
          <h1 className="title">Welcome</h1>
          <p className="subTitle">Please Scan Your ArcID</p>
          <img src="/images/scan.png" alt="Could not load" />
        </div>
      </div>
    )
  }
}

export default Welcome;
