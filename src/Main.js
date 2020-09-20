import React from 'react'
import {  Switch, Route } from 'react-router-dom'
import Welcome from './comp/Welcome/Welcome'
import Profile from './comp/Profile/Profile'

class Main extends React.Component {
  render() {
    return(
      <main>
        <Switch>
          <Route path="/Home" component={Welcome} />
          <Route path="/Profiles/:uid" component={Profile}/>
        </Switch>
      </main>
    )
  }
}

export default Main;
