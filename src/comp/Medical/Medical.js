import React from 'react'
import './Medical.css'

class Medical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: false
    }

    //this.update = this.update.bind(this);
  }

  //update(e) {
  //  this.props.passPassword(true);
  //}

  render() {
    if(true) {
    return(
      <div className="Overview">
        <div className="card">
          <div className="card-header">Symptom Report</div>
          <div className="card-body">
            <p>Coughing, Abdominal Pain</p>
            <button className="btn btn-primary">Add New</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Immunizations</div>
          <div className="card-body">
            <p>Hepatits B, Jan 1 1999</p>
            <p>Diphtheria, Jan 1 2005</p>
            <p>Polio, Feb 25 2013</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Blood Type</div>
          <div className="card-body">
            <p>B+</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Allergies</div>
          <div className="card-body">
            <p>Dogs, Cats</p>
            <p>Peanuts</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Diagnosis</div>
          <div className="card-body">
            <p>Low Iron Deficiency</p>
            <p></p>
          </div>
        </div>
      </div>
    )
  } else {
    return(
      <div className="NoAccess">
        <div className="Space">
        </div>
        <img src="/images/lock.svg" />
        <div className="Space">
        </div>
      </div>
    )
  }
  }
}

export default Medical;
