import React from 'react'
import './Appointments.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


var appmnt = [];

class Appointments extends React.Component {
  //constructor(props) {
  //  super(props);
  //}

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      val: ""
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.confirmAppointment = this.confirmAppointment.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    appmnt.push("Friday June 22, 2018 10:30 am");
    this.refreshPage = this.refreshPage.bind(this);
  }
  toggleModal() {
    this.setState({modal: !this.state.modal});
  }

  refreshPage() {
    window.location.reload();
  }

  confirmAppointment(e) {
    this.toggleModal();
    appmnt.push(this.state.val);
    window.alert('Your appointment has been set.');
  }

  handleOnChange(e) {
    this.setState({
      val: e.target.value
    })
  }

  render() {
    return(
      <div className="Appointments">
        <div className="card">
          <div className="card-header">Upcoming Appointments</div>
          <div className="card-body">
          {
            appmnt.map((obj, i) => {
              return(
                <div className="Appointments-Entry" key={i}>
                <p>{appmnt[i]}</p>
                <p>Dr. Shams Kamels</p>
                <button className="btn btn-danger btn-left" onClick={this.refreshPage}>Cancel</button>
                <button className="btn btn-warning">Reschedule</button>
                </div>
              )
            })
          }
          </div>

        </div>
        <div className="card">
          <div className="card-header">Previous Appointments</div>
          <div className="card-body">
            <p>Friday May 4, 2018 1:45 pm</p>
            <p>Dr. John Cams</p>
            <p>Doctors notes: iron deficiency, patient needs to eat more meats high in iron.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Request New Appointment</div>
          <div className="card-body">
          <button onClick={this.toggleModal} className="btn btn-success btn-left">Schedule</button>
          </div>
        </div>
        <form onSubmit={this.confirmAppointment}>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>Schedule an appointment</ModalHeader>
          <ModalBody>
            <p>Enter date and time:</p>
            <div className="input-group mb-3">
              <input id="dateTimeIn" placeholder="Monday June 4, 2018 10:30 am" onChange={this.handleOnChange} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirmAppointment}>Confirm</Button>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </form>
      </div>
    )
  }
}

export default Appointments;
