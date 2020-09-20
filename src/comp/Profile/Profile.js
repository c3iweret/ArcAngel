import React from 'react'
import firebase from '../firebase'
import LeftNav from '../LeftNav/LeftNav'
import Overview from '../Overview/Overview'
import Medical from '../Medical/Medical'
import Emergency from '../Emergency/Emergency'
import Appointments from '../Appointments/Appointments'
import Lab from '../Lab/Lab'
import Prescription from '../Prescription/Prescription'
import Conversation from '../Conversation/Conversation'
import {  Switch, Route } from 'react-router-dom'


var verified = false;

class Profile extends React.Component {

/*
This class will get the blockchain data and feed it to different
react components
*/
  constructor(props) {
    super(props);
    var uid = this.props.location.pathname.substring(10, 20);
    firebase.database().ref('Logins/').off('value');
    this.state = {
      UID: uid,
      IP: 0,
      verify: false
    }
    this.verifyPassword = this.verifyPassword.bind(this);
    this.passPassword = this.passPassword.bind(this);
  }

  verifyPassword(a) {
    /*console.log('getting called with value of:' + a);
    this.setState({
      verify: true
    })
    this.forceUpdate();
    console.log(this.state.verify);*/
    verified = a;
    console.log(verified);
  }

  passPassword(a) {
    this.setState({
      verify: a
    })
  }

  render() {
    return(
      <div>
        <LeftNav UID={this.state.UID} verify={this.verifyPassword} />
        <Switch>
          <Route path={"/Profiles/"+this.state.UID+"/Overview"} component={Overview}   />
          <Route path={"/Profiles/"+this.state.UID+"/Medical"} component={Medical} />
          <Route path={"/Profiles/"+this.state.UID+"/Emergency"} component={Emergency} />
          <Route path={"/Profiles/"+this.state.UID+"/Appointments"} component={Appointments} />
          <Route path={"/Profiles/"+this.state.UID+"/Lab"} component={Lab} />
          <Route path={"/Profiles/"+this.state.UID+"/Prescriptions"} component={Prescription} />
          <Route path={"/Profiles/"+this.state.UID+"/Conversation"} component={Conversation} />
        </Switch>
      </div>
    )
  }
}

export default Profile;
