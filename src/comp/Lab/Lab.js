import React from 'react'
import './Lab.css'

class Lab extends React.Component {
  //constructor(props) {
  //  super(props);
  //}

  render() {
    return(
      <div className="Lab">
        <div className="card">
          <div className="card-header">MRI Scans</div>
          <div className="card-body">
            <p>Nothing to display here.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Bloodtest Results</div>
          <div className="card-body">
          <p>2018-4-4: Blood iron levels low.</p>
          <p>2016-7-12: High cholestorol and sugar levels</p>
          <p>2015-3-1: Blood Type B+</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">X-Rays</div>
          <div className="card-body">
            <p>Nothing to display here.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Lab;
