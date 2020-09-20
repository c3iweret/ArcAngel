import React from 'react'
import './Overview.css'

class Overview extends React.Component {
  //constructor(props) {
  //  super(props);
  //}

  render() {
    return(
      <div className="Overview">
        <div className="card">
          <div className="card-header">Personal Information</div>
          <div className="card-body">
            <p>Name: Asseel Sidique</p>
            <p>Birthdate: January 1st, 1996 (22)</p>
            <p>Gender: Male</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Healthcare Providers</div>
          <div className="card-body">
            <p>Physician: John Doe</p>
            <p>Cardiology: Jane Doe</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Last Check Up</div>
          <div className="card-body">
            <p>21 Days Ago</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Reminders</div>
          <div className="card-body">
            <p>Take 2 tablets of Tylenol with food today</p>
            <p>Eat food with lots of iron</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Overview;
