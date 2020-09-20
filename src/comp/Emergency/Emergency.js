import React from 'react'
import './Emergency.css'

class Emergency extends React.Component {
  //constructor(props) {
  //  super(props);
  //}

  render() {
    return(
      <div className="EmergencyPage">
        <div className="card">
          <div className="card-header">PERSONAL</div>
          <div className="card-body">
            <p>Asseel Sidique</p>
            <p>123 King Street, Toronto, ON</p>
          </div>
        </div>
        <div className="card card2">
          <div className="card-header">ALLERGIES</div>
          <div className="card-body3">
            <p>Sinusitis: </p>
            <p>Allergic Rhinitis:</p>
            <p>Asthma: </p>
          </div>
          <div className="card-body2">
            <p className="Severe">SEVERE</p>
            <p className="Moderate">MODERATE</p>
            <p className="Severe">SEVERE </p>
          </div>

        </div>
        <div className="card">
          <div className="card-header">CURRENT MEDICATION</div>
          <div className="card-body">
            <p>Tylenol : 50mg, twice daily</p>
            <p>Insulin : 10mg, once daily</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">MEDICAL CONDITIONS</div>
          <div className="card-body">
            <p>Glucomia</p>
            <p>Diabetes Type A</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">OTHER</div>
          <div className="card-body">
          </div>
        </div>
        <div className="card">
          <div className="card-header">EMERGENCY CONTACT</div>
          <div className="card-body">
            <p>Ms. Sidique</p>
            <p>Relationship: Wife </p>
            <p>Phone:  905 123 1234</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Emergency;
