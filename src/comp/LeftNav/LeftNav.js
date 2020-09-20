import React from 'react'
import './LeftNav.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePassHide = this.togglePassHide.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
  }

  componentDidMount() {

   }
   componentWillUnmount() {

   }

  toggleModal() {
    this.setState({modal: !this.state.modal});
  }

  togglePassHide() {
    if(document.getElementById('passVerify').type === "password") {
      document.getElementById('passVerify').type='text';
    } else {
      document.getElementById('passVerify').type='password';
    }
  }
  verifyPassword() {
    console.log("called");
    var pass = "";
    if(document.getElementById('passVerify') !== null) {
      pass = document.getElementById('passVerify').value;
    }
    this.toggleModal();
    if(pass !== undefined && pass !== null && pass.length !== 0)  {
      if(pass === "arkangel" || pass === "doctor") {
        this.props.verify(true);
        this.props.history.push("/Profiles/"+this.state.UID + "/Overview", null);
        return true;
      }
    }
  }

  render() {
    return(
      <div className="LeftNav">
      <div className="Profile-Overview">
        <img src="/images/profile.png" alt="Could not load" className="ThatCircle"/>
        <p className="LeftNav-Title">ASSEEL SIDIQUE</p>
      </div>
        <div className="LeftNav-Container">
          <a href={"/Profiles/"+this.props.UID+"/Overview"}>
          <div className="LeftNav-Item">
            <img alt="Could not load" src="/images/overview.png"/>
            <p>Overview</p>
          </div>
          </a>
          <a href={"/Profiles/"+this.props.UID+"/Medical"}>
          <div className="LeftNav-Item">
            <img alt="Could not load" src="/images/medical.png"/>
            <p>Medical</p>
          </div>
          </a>
          <a href={"/Profiles/"+this.props.UID+"/Appointments"}>
          <div className="LeftNav-Item">
            <img alt="Could not load" src="/images/appointment.png"/>
            <p>Appointments</p>
          </div>
          </a>
          <a href={"/Profiles/"+this.props.UID+"/Lab"}>
          <div className="LeftNav-Item">
            <img alt="Could not load" src="/images/lab.png"/>
            <p>Lab Results</p>
          </div>
          </a>
          <a href={"/Profiles/"+this.props.UID+"/Prescriptions"}>
          <div className="LeftNav-Item">
            <img alt="Could not load" src="/images/prescription.png"/>
            <p>Prescriptions</p>
          </div>
          </a>
          <button onClick={this.toggleModal}>
            <div className="LeftNav-Item">
              <img alt="Could not load" src="/images/lock.svg"/>
              <p>Access Control</p>
            </div>
          </button>
          <a href={"/Profiles/"+this.props.UID+"/Emergency"}>
          <div className="LeftNav-Item">
            <img alt="Could not load" src="/images/emergency.png"/>
            <p className="Emergency">Emergency</p>
          </div>
          </a>
          <a href={"/Profiles/"+this.props.UID+"/Conversation"}>
          <div className="LeftNav-Item Arkangel">
            <img alt="Could not load" src="/images/arkangel.png"/>
            <p>ArcAngel</p>
          </div>
          </a>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>Authentication</ModalHeader>
          <ModalBody>
            <p>Please type in your password:</p>
            <div className="input-group mb-3">
              <input id="passVerify" type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                  <button onClick={this.togglePassHide}/>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="password" color="primary" onClick={this.verifyPassword}>Verify</Button>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default LeftNav;
