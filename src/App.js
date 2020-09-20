import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import firebase from 'firebase'
import $ from 'jquery';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storageValue: 0,
      web3: null,
      UID: "",
      IP: ""
    }

    var thisRef = this;

    var config = {
      apiKey: "AIzaSyDXGdgxjWA4ze1NfgF3hPUBbCciceBfxSw",
      authDomain: "project-red-9c089.firebaseapp.com",
      databaseURL: "https://project-red-9c089.firebaseio.com",
      projectId: "project-red-9c089",
      storageBucket: "",
      messagingSenderId: "664289493194"
    };


    $.getJSON("http://api.ipify.org/?format=json", function(e) {
      thisRef.setState({
        IP: e.ip.toString().replace(/\./g, "")
      });
    });

    firebase.initializeApp(config);

    firebase.auth().signInWithEmailAndPassword("sidiqueafg@gmail.com", "projectred").catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
      // ...
    });

    firebase.database().ref('Logins/' + this.state.IP).on('value', function(snap) {
      var arr = (Object.values(snap.val())[0]);
      var index = arr.length;
      thisRef.setState({
        UID: arr[index-1].UID
      })
    });

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1 className="App-title">{"Current ID: " + this.state.UID}</h1>
              <p>IP Address: {this.state.IP}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
