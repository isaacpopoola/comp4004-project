import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'

import LandingPage from './Views/Pages/Landing/LandingPage'
import RegisterPage from './Views/Pages/Register/RegisterPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
