import React from 'react'
import './Prescription.css'

class Prescription extends React.Component {
  //constructor(props) {
  //  super(props);
  //}

  render() {
    return(
      <div className="Prescription">
        <div className="card">
          <div className="card-header">Current Prescriptions</div>
          <div className="card-body">
            <p>Tylenol : 50mg, twice daily</p>
            <p>Insulin : 10mg, once daily</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Previous Prescriptions</div>
          <div className="card-body">
          <p>Advil : 50mg, once daily</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Refill Warnings</div>
          <div className="card-body">
          <p className="warning">Required to refill Insulin in two days.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Prescription;
